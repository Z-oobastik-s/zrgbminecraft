import {
  Document,
  Pair,
  Scalar,
  parseDocument,
  visit,
  stringify,
  isScalar,
} from 'yaml'
import type { Node } from 'yaml'

export type YamlStringField = {
  id: string
  path: string
  start: number
  end: number
  value: string
  originalToken: string
  /** Present for JSON files: path to replace when saving (not raw-byte YAML edits). */
  jsonSegments?: (string | number)[]
}

function pathSegmentsFromVisit(
  path: readonly (Document | Node | Pair)[],
  key: number | 'key' | 'value' | null
): string[] {
  const segs: string[] = []
  for (const node of path) {
    if (node instanceof Pair && isScalar(node.key)) {
      const kv = node.key as Scalar
      if (typeof kv.value === 'string') segs.push(kv.value)
      else segs.push(String(kv.value))
    }
  }
  if (typeof key === 'number') segs.push(`[${key}]`)
  return segs
}

function humanPath(segs: string[]): string {
  if (segs.length === 0) return '(root)'
  return segs.join('.')
}

function detectScalarType(token: string): Scalar.Type | undefined {
  const t = token.trimStart()
  if (t.startsWith('"')) return Scalar.QUOTE_DOUBLE
  if (t.startsWith("'")) return Scalar.QUOTE_SINGLE
  if (t.startsWith('|-') || t.startsWith('|')) return Scalar.BLOCK_LITERAL
  if (t.startsWith('>') || t.startsWith('>-')) return Scalar.BLOCK_FOLDED
  return undefined
}

export function encodeScalarForYaml(
  newValue: string,
  originalToken: string
): string {
  const st = detectScalarType(originalToken)
  const n = new Scalar(newValue)
  if (st) n.type = st
  return stringify(new Document(n)).trimEnd()
}

export function extractYamlStringFields(raw: string): YamlStringField[] {
  const doc = parseDocument(raw)
  if (doc.errors.length > 0) return []

  const fields: YamlStringField[] = []
  let i = 0
  visit(doc, {
    Scalar(key, node, path) {
      if (key === 'key') return
      if (typeof node.value !== 'string') return
      if (!node.range) return
      const [start, end] = node.range
      const originalToken = raw.slice(start, end)
      const segs = pathSegmentsFromVisit(path, key)
      const id = `f-${i++}-${start}`
      fields.push({
        id,
        path: humanPath(segs),
        start,
        end,
        value: node.value,
        originalToken,
      })
    },
  })
  return fields
}

export function parseYamlDiagnostics(raw: string): {
  valid: boolean
  error?: string
} {
  try {
    const doc = parseDocument(raw)
    if (doc.errors.length) {
      return {
        valid: false,
        error: doc.errors.map((e) => e.message).join('; '),
      }
    }
    return { valid: true }
  } catch (e) {
    return {
      valid: false,
      error: e instanceof Error ? e.message : String(e),
    }
  }
}

export function applyYamlStringEdits(
  raw: string,
  fields: YamlStringField[],
  valuesById: Record<string, string>
): string {
  type Edit = { start: number; end: number; text: string }
  const edits: Edit[] = []
  for (const f of fields) {
    if (f.jsonSegments?.length) continue
    const next = valuesById[f.id]
    if (next === undefined || next === f.value) continue
    const encoded = encodeScalarForYaml(next, f.originalToken)
    edits.push({ start: f.start, end: f.end, text: encoded })
  }
  edits.sort((a, b) => b.start - a.start)
  let out = raw
  for (const e of edits) {
    out = out.slice(0, e.start) + e.text + out.slice(e.end)
  }
  return out
}
