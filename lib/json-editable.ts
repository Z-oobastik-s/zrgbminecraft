import type { YamlStringField } from '@/lib/yaml-editable'

export function parseJsonDiagnostics(raw: string): {
  valid: boolean
  error?: string
} {
  try {
    JSON.parse(raw)
    return { valid: true }
  } catch (e) {
    return {
      valid: false,
      error: e instanceof Error ? e.message : String(e),
    }
  }
}

/** Prefer JSON when extension is .json, else YAML for .yml; otherwise sniff valid JSON objects/arrays. */
export function pickYamlOrJson(fileName: string, raw: string): 'yaml' | 'json' {
  const lower = fileName.toLowerCase()
  if (lower.endsWith('.json')) return 'json'
  if (lower.endsWith('.yml') || lower.endsWith('.yaml')) return 'yaml'
  const t = raw.trimStart()
  if (
    (t.startsWith('{') || t.startsWith('[')) &&
    parseJsonDiagnostics(raw).valid
  ) {
    return 'json'
  }
  return 'yaml'
}

function humanPathFromSegments(segments: (string | number)[]): string {
  if (segments.length === 0) return '(root)'
  return segments
    .map((s) => (typeof s === 'number' ? `[${s}]` : s))
    .join('.')
}

function walkStringValues(
  node: unknown,
  segments: (string | number)[],
  out: YamlStringField[],
  idCounter: { n: number }
): void {
  if (node === null || typeof node !== 'object') {
    return
  }
  if (Array.isArray(node)) {
    node.forEach((item, i) => {
      const nextSegs = [...segments, i]
      if (typeof item === 'string') {
        const id = `f-${idCounter.n++}-json`
        out.push({
          id,
          path: humanPathFromSegments(nextSegs),
          start: -1,
          end: -1,
          value: item,
          originalToken: '',
          jsonSegments: nextSegs,
        })
      } else {
        walkStringValues(item, nextSegs, out, idCounter)
      }
    })
    return
  }
  for (const key of Object.keys(node as Record<string, unknown>)) {
    const val = (node as Record<string, unknown>)[key]
    const nextSegs = [...segments, key]
    if (typeof val === 'string') {
      const id = `f-${idCounter.n++}-json`
      out.push({
        id,
        path: humanPathFromSegments(nextSegs),
        start: -1,
        end: -1,
        value: val,
        originalToken: '',
        jsonSegments: nextSegs,
      })
    } else {
      walkStringValues(val, nextSegs, out, idCounter)
    }
  }
}

export function extractJsonStringFields(raw: string): YamlStringField[] {
  if (!parseJsonDiagnostics(raw).valid) return []
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return []
  }
  if (typeof parsed === 'string') {
    return [
      {
        id: 'f-0-json',
        path: '(root)',
        start: -1,
        end: -1,
        value: parsed,
        originalToken: '',
        jsonSegments: [],
      },
    ]
  }
  const out: YamlStringField[] = []
  walkStringValues(parsed, [], out, { n: 0 })
  return out
}

function setByPath(
  root: unknown,
  segments: (string | number)[],
  value: string
): void {
  if (segments.length === 0) return
  let cur: unknown = root
  for (let i = 0; i < segments.length - 1; i++) {
    const s = segments[i]!
    if (typeof s === 'number') {
      if (!Array.isArray(cur)) return
      cur = cur[s]
    } else {
      if (cur === null || typeof cur !== 'object') return
      cur = (cur as Record<string, unknown>)[s]
    }
  }
  const last = segments[segments.length - 1]!
  if (typeof last === 'number') {
    if (!Array.isArray(cur)) return
    cur[last] = value
  } else {
    if (cur === null || typeof cur !== 'object') return
    ;(cur as Record<string, unknown>)[last] = value
  }
}

function guessJsonIndent(raw: string): string | number | undefined {
  const i = raw.indexOf('\n')
  if (i === -1) return undefined
  const after = raw.slice(i + 1)
  const m = after.match(/^([ \t]+)[^\s\r\n]/)
  if (!m) return undefined
  const ws = m[1]
  if (ws.includes('\t')) return '\t'
  const n = ws.length
  return n >= 1 ? n : 2
}

export function applyJsonStringEdits(
  raw: string,
  fields: YamlStringField[],
  valuesById: Record<string, string>
): string {
  let parsed: unknown = JSON.parse(raw)
  if (typeof parsed === 'string') {
    const f = fields[0]
    const next = f ? valuesById[f.id] : undefined
    if (f && next !== undefined && next !== f.value) {
      return JSON.stringify(next)
    }
    return raw
  }
  for (const f of fields) {
    if (!f.jsonSegments?.length) continue
    const next = valuesById[f.id]
    if (next === undefined || next === f.value) continue
    setByPath(parsed, f.jsonSegments, next)
  }
  const indent = guessJsonIndent(raw)
  if (indent === undefined) {
    return JSON.stringify(parsed)
  }
  return JSON.stringify(parsed, null, indent)
}
