'use client'

import { useMemo, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Copy, Download, ShieldCheck, Upload } from 'lucide-react'
import { parseDocument } from 'yaml'
import { useCopyFeedback } from '@/hooks/useCopyFeedback'
import {
  CONFIG_FILE_ORDER,
  SERVER_SETTINGS,
  fileDisplayName,
  type ServerConfigFile,
} from '@/lib/server-settings'
import { DEFAULT_SERVER_CONFIG_TEMPLATES } from '@/lib/server-config-templates'

type ValueMap = Record<string, string | number | boolean>
type RawFileMap = Partial<Record<ServerConfigFile, string>>
type ErrorMap = Partial<Record<ServerConfigFile, string>>

/** Произвольный конфиг (permissions.yml и т.д.) - только полноэкранный текстовый редактор. */
type CustomFileState = { name: string; text: string }
type LogFileState = { name: string; text: string }
type LogLevel = 'error' | 'warn' | 'info' | 'debug' | 'other'
type LogLine = {
  idx: number
  raw: string
  level: LogLevel
  source: string
}

function basenameLower(name: string): string {
  const s = name.replace(/\\/g, '/')
  const i = s.lastIndexOf('/')
  return (i >= 0 ? s.slice(i + 1) : s).toLowerCase()
}

function matchPresetByFileName(name: string): ServerConfigFile | null {
  const b = basenameLower(name)
  if (b.endsWith('server.properties')) return 'server.properties'
  if (b.endsWith('bukkit.yml') || b.endsWith('bukkit.yaml')) return 'bukkit.yml'
  if (b.endsWith('spigot.yml') || b.endsWith('spigot.yaml')) return 'spigot.yml'
  if (b.endsWith('paper-global.yml') || b.endsWith('paper_global.yml'))
    return 'paper-global.yml'
  if (
    b.endsWith('paper-world-defaults.yml') ||
    b.endsWith('paper_world_defaults.yml') ||
    b.endsWith('paper-world-defaults.yaml')
  )
    return 'paper-world-defaults.yml'
  return null
}

function isLogFileName(name: string): boolean {
  const b = basenameLower(name)
  return b.endsWith('.log') || b.includes('latest.log')
}

function detectLogLevel(line: string): LogLevel {
  const s = line.toLowerCase()
  if (
    /\b(error|severe|fatal|exception|fail(ed|ure)?|stack trace|traceback)\b/i.test(line) ||
    s.includes('] [server thread/error]')
  )
    return 'error'
  if (/\b(warn|warning)\b/i.test(line) || s.includes('] [server thread/warn]')) return 'warn'
  if (/\b(debug|trace)\b/i.test(line)) return 'debug'
  if (/\b(info|notice|startup|done)\b/i.test(line) || s.includes('] [server thread/info]'))
    return 'info'
  return 'other'
}

function detectLogSource(line: string): string {
  const matches = [...line.matchAll(/\[([^\]]{2,48})\]/g)]
  const skip = new Set([
    'info',
    'warn',
    'warning',
    'error',
    'debug',
    'trace',
    'server thread',
    'async chat thread',
    'main',
    'worker',
  ])
  for (const m of matches) {
    const token = (m[1] || '').trim()
    const lower = token.toLowerCase()
    if (!token) continue
    if (skip.has(lower)) continue
    if (lower.includes('/info') || lower.includes('/warn') || lower.includes('/error')) continue
    if (/^\d{2}:\d{2}:\d{2}$/.test(token)) continue
    if (/^\d{4}-\d{2}-\d{2}/.test(token)) continue
    if (/^[A-Za-z0-9_.-]+$/.test(token)) return token
  }
  return 'core'
}

function levelLabel(level: LogLevel): string {
  if (level === 'error') return 'Ошибки'
  if (level === 'warn') return 'Предупреждения'
  if (level === 'info') return 'Инфо'
  if (level === 'debug') return 'Debug'
  return 'Остальное'
}

function levelBadgeClass(level: LogLevel): string {
  if (level === 'error') return 'border-red-500/35 bg-red-500/8 text-red-100'
  if (level === 'warn') return 'border-amber-500/35 bg-amber-500/8 text-amber-100'
  if (level === 'info') return 'border-sky-500/30 bg-sky-500/8 text-sky-100'
  if (level === 'debug') return 'border-violet-500/30 bg-violet-500/8 text-violet-100'
  return 'border-zinc-500/30 bg-zinc-500/6 text-zinc-200'
}

function levelRowClass(level: LogLevel): string {
  if (level === 'error') return 'border-red-500/20 bg-red-500/[0.06]'
  if (level === 'warn') return 'border-amber-500/20 bg-amber-500/[0.05]'
  if (level === 'info') return 'border-sky-500/20 bg-sky-500/[0.04]'
  if (level === 'debug') return 'border-violet-500/20 bg-violet-500/[0.04]'
  return 'border-white/10 bg-white/[0.02]'
}

function setAtPath(root: Record<string, unknown>, path: string, value: unknown) {
  const keys = path.split('.')
  let cur: Record<string, unknown> = root
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i]!
    const next = cur[k]
    if (!next || typeof next !== 'object' || Array.isArray(next)) {
      cur[k] = {}
    }
    cur = cur[k] as Record<string, unknown>
  }
  cur[keys[keys.length - 1]!] = value
}

function pathSegments(path: string): string[] {
  return path.split('.')
}

function castByType(
  raw: unknown,
  type: 'boolean' | 'number' | 'text' | 'select'
): string | number | boolean {
  if (type === 'boolean') {
    if (typeof raw === 'boolean') return raw
    if (typeof raw === 'string') return raw.trim().toLowerCase() === 'true'
    if (typeof raw === 'number') return raw !== 0
    return false
  }
  if (type === 'number') {
    if (typeof raw === 'number' && Number.isFinite(raw)) return raw
    if (typeof raw === 'string') {
      const n = Number(raw.trim())
      return Number.isFinite(n) ? n : 0
    }
    return 0
  }
  return raw === null || raw === undefined ? '' : String(raw)
}

function readProperties(raw: string): Record<string, string> {
  const out: Record<string, string> = {}
  const lines = raw.split(/\r?\n/)
  for (const line of lines) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const idx = t.indexOf('=')
    if (idx < 0) continue
    const key = t.slice(0, idx).trim()
    const val = t.slice(idx + 1)
    out[key] = val
  }
  return out
}

function applyPropertiesPatch(raw: string, patch: Record<string, string>): string {
  const lines = raw.split(/\r?\n/)
  const touched = new Set<string>()
  const next = lines.map((line) => {
    const idx = line.indexOf('=')
    if (idx <= 0) return line
    const key = line.slice(0, idx).trim()
    if (!(key in patch)) return line
    touched.add(key)
    return `${key}=${patch[key]}`
  })
  for (const [k, v] of Object.entries(patch)) {
    if (!touched.has(k)) next.push(`${k}=${v}`)
  }
  return next.join('\n')
}

function downloadText(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function toYaml(value: unknown, depth = 0): string[] {
  const pad = '  '.repeat(depth)
  if (value === null) return [`${pad}null`]
  if (typeof value === 'boolean' || typeof value === 'number') return [`${pad}${value}`]
  if (typeof value === 'string') return [`${pad}${value}`]
  if (Array.isArray(value)) {
    return value.flatMap((v) => {
      if (typeof v === 'object' && v !== null) {
        const nested = toYaml(v, depth + 1)
        if (nested.length === 0) return [`${pad}-`]
        return [`${pad}- ${nested[0]!.trimStart()}`, ...nested.slice(1)]
      }
      return [`${pad}- ${String(v)}`]
    })
  }
  const o = value as Record<string, unknown>
  const lines: string[] = []
  for (const [k, v] of Object.entries(o)) {
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      lines.push(`${pad}${k}:`)
      lines.push(...toYaml(v, depth + 1))
    } else {
      lines.push(`${pad}${k}: ${String(v)}`)
    }
  }
  return lines
}

export function ServerSettingsView() {
  const t = useTranslations('serverPage')
  const locale = useLocale()
  const [query, setQuery] = useState('')
  const [editorMode, setEditorMode] = useState<'full' | 'quick'>('full')
  const [selectedFile, setSelectedFile] = useState<ServerConfigFile>('server.properties')
  const initialValues = useMemo<ValueMap>(() => {
    const entries = SERVER_SETTINGS.map((s) => [s.id, s.value] as const)
    return Object.fromEntries(entries)
  }, [])
  const [values, setValues] = useState<ValueMap>(initialValues)
  const [rawFiles, setRawFiles] = useState<RawFileMap>({})
  const [parseErrors, setParseErrors] = useState<ErrorMap>({})
  const [copiedFile, setCopiedFile] = useState<string | null>(null)
  const [customFile, setCustomFile] = useState<CustomFileState | null>(null)
  const [logFile, setLogFile] = useState<LogFileState | null>(null)
  const [logQuery, setLogQuery] = useState('')
  const [logSource, setLogSource] = useState('all')
  const [logLevelFilter, setLogLevelFilter] = useState<Record<LogLevel, boolean>>({
    error: true,
    warn: true,
    info: true,
    debug: false,
    other: true,
  })
  const [logScrollTop, setLogScrollTop] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const logViewportRef = useRef<HTMLDivElement>(null)
  const { copiedId, copy } = useCopyFeedback(1800)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return SERVER_SETTINGS.filter((s) => {
      const fileOk = s.file === selectedFile
      if (!fileOk) return false
      if (!q) return true
      return (
        s.label.toLowerCase().includes(q) ||
        s.keyPath.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
      )
    })
  }, [query, selectedFile])

  const exports = useMemo(() => {
    const out: Record<ServerConfigFile, string> = {
      'server.properties': '',
      'bukkit.yml': '',
      'spigot.yml': '',
      'paper-global.yml': '',
      'paper-world-defaults.yml': '',
    }
    for (const file of CONFIG_FILE_ORDER) {
      const rows = SERVER_SETTINGS.filter((s) => s.file === file)
      try {
        const baseTemplate = rawFiles[file] ?? DEFAULT_SERVER_CONFIG_TEMPLATES[file]
        if (file === 'server.properties') {
          const patch = Object.fromEntries(rows.map((r) => [r.keyPath, String(values[r.id])]))
          out[file] = baseTemplate
            ? applyPropertiesPatch(baseTemplate, patch)
            : rows.map((r) => `${r.keyPath}=${String(values[r.id])}`).join('\n')
          continue
        }
        if (baseTemplate) {
          const doc = parseDocument(baseTemplate)
          for (const row of rows) {
            doc.setIn(pathSegments(row.keyPath), values[row.id])
          }
          out[file] = String(doc).trimEnd()
          continue
        }
        const tree: Record<string, unknown> = {}
        for (const row of rows) {
          setAtPath(tree, row.keyPath, values[row.id])
        }
        out[file] = toYaml(tree).join('\n')
      } catch {
        const tree: Record<string, unknown> = {}
        for (const row of rows) {
          setAtPath(tree, row.keyPath, values[row.id])
        }
        out[file] = toYaml(tree).join('\n')
      }
    }
    return out
  }, [rawFiles, values])

  const parsedLogLines = useMemo<LogLine[]>(() => {
    if (!logFile) return []
    return logFile.text.split(/\r?\n/).map((raw, idx) => ({
      idx: idx + 1,
      raw,
      level: detectLogLevel(raw),
      source: detectLogSource(raw),
    }))
  }, [logFile])

  const logSourceCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const row of parsedLogLines) {
      counts[row.source] = (counts[row.source] || 0) + 1
    }
    return counts
  }, [parsedLogLines])

  const topSources = useMemo(() => {
    return Object.entries(logSourceCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([source]) => source)
  }, [logSourceCounts])

  const logLevelCounts = useMemo<Record<LogLevel, number>>(() => {
    const counts: Record<LogLevel, number> = {
      error: 0,
      warn: 0,
      info: 0,
      debug: 0,
      other: 0,
    }
    for (const row of parsedLogLines) counts[row.level] += 1
    return counts
  }, [parsedLogLines])

  const sourceScopedLogLines = useMemo(() => {
    return parsedLogLines.filter((line) => (logSource === 'all' ? true : line.source === logSource))
  }, [logSource, parsedLogLines])

  const sourceScopedLevelCounts = useMemo<Record<LogLevel, number>>(() => {
    const counts: Record<LogLevel, number> = {
      error: 0,
      warn: 0,
      info: 0,
      debug: 0,
      other: 0,
    }
    for (const row of sourceScopedLogLines) counts[row.level] += 1
    return counts
  }, [sourceScopedLogLines])

  const filteredLogLines = useMemo(() => {
    const q = logQuery.trim().toLowerCase()
    return parsedLogLines.filter((line) => {
      if (!logLevelFilter[line.level]) return false
      if (logSource !== 'all' && line.source !== logSource) return false
      if (!q) return true
      return line.raw.toLowerCase().includes(q)
    })
  }, [logLevelFilter, logQuery, logSource, parsedLogLines])

  const rowHeight = 28
  const overscan = 30
  const viewportHeight = 560
  const totalVirtualHeight = filteredLogLines.length * rowHeight
  const startIndex = Math.max(0, Math.floor(logScrollTop / rowHeight) - overscan)
  const endIndex = Math.min(
    filteredLogLines.length,
    startIndex + Math.ceil(viewportHeight / rowHeight) + overscan * 2
  )
  const visibleLogLines = filteredLogLines.slice(startIndex, endIndex)

  const handleFileLoaded = async (f: File) => {
    const text = await f.text()
    const preset = matchPresetByFileName(f.name)
    const logLike = isLogFileName(f.name)

    if (preset) {
      setLogFile(null)
      setCustomFile(null)
      setSelectedFile(preset)
      const target = preset
      const fileRows = SERVER_SETTINGS.filter((s) => s.file === target)
      try {
        const patchValues: ValueMap = {}
        if (target === 'server.properties') {
          const map = readProperties(text)
          for (const row of fileRows) {
            if (row.keyPath in map) patchValues[row.id] = castByType(map[row.keyPath], row.type)
          }
        } else {
          const doc = parseDocument(text)
          for (const row of fileRows) {
            const raw = doc.getIn(pathSegments(row.keyPath))
            if (raw !== undefined) patchValues[row.id] = castByType(raw, row.type)
          }
        }
        setRawFiles((prev) => ({ ...prev, [target]: text }))
        setValues((prev) => ({ ...prev, ...patchValues }))
        setParseErrors((prev) => ({ ...prev, [target]: undefined }))
      } catch (e) {
        setParseErrors((prev) => ({
          ...prev,
          [target]: e instanceof Error ? e.message : String(e),
        }))
      }
      return
    }

    if (logLike) {
      setCustomFile(null)
      setLogQuery('')
      setLogSource('all')
      setLogScrollTop(0)
      setLogLevelFilter({
        error: true,
        warn: true,
        info: true,
        debug: false,
        other: true,
      })
      setLogFile({ name: f.name, text })
      return
    }

    setLogFile(null)
    setCustomFile({ name: f.name, text })
  }

  return (
    <section className="mx-auto flex min-h-0 w-full max-w-[min(92rem,calc(100vw-0.75rem))] flex-1 flex-col gap-2 overflow-hidden px-2 pb-1 pt-0.5 sm:px-3 sm:pb-2 sm:pt-1">
      {!customFile && !logFile ? (
        <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-3 text-[12px] text-emerald-100">
          <p className="font-semibold">{t('title')}</p>
          <p className="mt-1 text-emerald-100/80">
            {t('subtitle')}
          </p>
        </div>
      ) : !logFile ? (
        <div className="rounded-xl border border-sky-500/25 bg-sky-500/10 p-3 text-[12px] text-sky-100">
          <p className="font-semibold">{t('customEditorTitle')}</p>
          <p className="mt-1 text-sky-100/85">
            {t('customEditorHint')}
          </p>
        </div>
      ) : null}

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#141722] p-3">
        <div className="grid shrink-0 grid-cols-1 gap-2 border-b border-white/[0.08] pb-3 xl:grid-cols-[1fr_auto_auto]">
          {!customFile && !logFile ? (
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="min-w-[18rem] rounded-lg border border-white/10 bg-[#0d0f14] px-3 py-2 text-xs text-zinc-200 outline-none focus:border-sky-500/60"
            />
          ) : logFile ? (
            <div className="flex min-h-[2.5rem] flex-wrap items-center gap-2 rounded-lg border border-white/10 bg-[#0d0f14] px-3 py-2 text-xs text-zinc-300">
              <span className="text-zinc-500">Лог:</span>
              <span className="font-mono text-violet-200">{logFile.name}</span>
              <button
                type="button"
                onClick={() => setLogFile(null)}
                className="rounded border border-white/15 bg-black/40 px-2 py-1 text-[11px] text-zinc-200 hover:bg-white/10"
              >
                {t('backToTemplates')}
              </button>
            </div>
          ) : (
            <div className="flex min-h-[2.5rem] flex-wrap items-center gap-2 rounded-lg border border-white/10 bg-[#0d0f14] px-3 py-2 text-xs text-zinc-300">
              <span className="text-zinc-500">{t('openedFile')}</span>
              <span className="font-mono text-sky-200">{customFile?.name ?? ''}</span>
              <button
                type="button"
                onClick={() => setCustomFile(null)}
                className="rounded border border-white/15 bg-black/40 px-2 py-1 text-[11px] text-zinc-200 hover:bg-white/10"
              >
                {t('backToTemplates')}
              </button>
            </div>
          )}
          <select
            value={selectedFile}
            onChange={(e) => {
              setCustomFile(null)
              setLogFile(null)
              setSelectedFile(e.target.value as ServerConfigFile)
            }}
            className="rounded-lg border border-white/10 bg-[#0d0f14] px-2 py-2 text-xs text-zinc-200 outline-none focus:border-sky-500/60"
          >
            {CONFIG_FILE_ORDER.map((f) => (
              <option key={f} value={f}>
                {fileDisplayName(f)}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center justify-center gap-1 rounded border border-white/15 bg-black/30 px-3 py-2 text-[12px] text-zinc-200 hover:bg-white/10"
          >
            <Upload className="h-3.5 w-3.5" />
            {t('uploadFile')}
          </button>
          <header className="flex flex-wrap items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".properties,.yml,.yaml,.log,text/plain,text/yaml"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) void handleFileLoaded(f)
                e.currentTarget.value = ''
              }}
            />
          </header>
        </div>

        {logFile ? (
          <div className="flex min-h-0 flex-1 flex-col gap-2 pt-3">
            <div className="sticky top-0 z-20 grid grid-cols-1 gap-2 rounded-lg border border-white/[0.08] bg-[#10131d]/95 p-2 backdrop-blur xl:grid-cols-[1fr_auto]">
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-[1fr_auto_auto]">
                <input
                  value={logQuery}
                  onChange={(e) => setLogQuery(e.target.value)}
                  placeholder={t('logSearchPlaceholder')}
                  className="min-w-[18rem] rounded-lg border border-white/10 bg-[#0d0f14] px-3 py-2 text-xs text-zinc-200 outline-none focus:border-violet-500/60"
                />
                <select
                  value={logSource}
                  onChange={(e) => setLogSource(e.target.value)}
                  className="rounded-lg border border-white/10 bg-[#0d0f14] px-2 py-2 text-xs text-zinc-200 outline-none focus:border-violet-500/60"
                >
                  <option value="all">
                    {t('allSources')} ({parsedLogLines.length})
                  </option>
                  {topSources.map((source) => (
                    <option key={source} value={source}>
                      {source} ({logSourceCounts[source] || 0})
                    </option>
                  ))}
                </select>
                <div className="flex flex-wrap gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setLogQuery('')
                      setLogSource('all')
                      setLogLevelFilter({
                        error: true,
                        warn: true,
                        info: true,
                        debug: false,
                        other: true,
                      })
                    }}
                    className="rounded border border-white/15 bg-black/30 px-2 py-1 text-[11px] text-zinc-200 hover:bg-white/10"
                  >
                    {t('all')}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setLogLevelFilter({
                        error: true,
                        warn: true,
                        info: false,
                        debug: false,
                        other: false,
                      })
                    }
                    className="rounded border border-red-500/35 bg-red-500/10 px-2 py-1 text-[11px] text-red-200 hover:bg-red-500/20"
                  >
                    {t('onlyProblems')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setLogQuery('Exception')}
                    className="rounded border border-violet-500/35 bg-violet-500/10 px-2 py-1 text-[11px] text-violet-200 hover:bg-violet-500/20"
                  >
                    {t('stacktraces')}
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {(['error', 'warn', 'info', 'debug', 'other'] as LogLevel[]).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() =>
                      setLogLevelFilter((prev) => ({ ...prev, [level]: !prev[level] }))
                    }
                    className={`inline-flex items-center gap-1 rounded border px-2 py-1 text-[11px] transition ${
                      logLevelFilter[level]
                        ? levelBadgeClass(level)
                        : 'border-white/15 bg-black/30 text-zinc-400 hover:bg-white/10'
                    }`}
                  >
                    <span>{levelLabel(level)}</span>
                    <span className="font-mono opacity-90">
                      {logQuery.trim()
                        ? `${filteredLogLines.filter((row) => row.level === level).length}/${sourceScopedLevelCounts[level]}`
                        : sourceScopedLevelCounts[level]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col rounded-lg border border-white/[0.07] bg-black/20 p-2">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                <div className="text-zinc-400">
                  {t('shownRows')}{' '}
                  <span className="font-mono text-zinc-200">{filteredLogLines.length}</span> /{' '}
                  <span className="font-mono text-zinc-200">{parsedLogLines.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCopiedFile('__log__')
                      void copy(filteredLogLines.map((line) => line.raw).join('\n'))
                    }}
                    className="inline-flex items-center gap-1 rounded border border-white/15 bg-black/30 px-2 py-1 text-[11px] text-zinc-200 hover:bg-white/10"
                  >
                    <Copy className="h-3 w-3" />
                    {copiedFile === '__log__' ? t('copied') : t('copyFiltered')}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      downloadText(
                        `${logFile.name.replace(/\.log$/i, '')}-filtered.log`,
                        filteredLogLines.map((line) => line.raw).join('\n')
                      )
                    }
                    className="inline-flex items-center gap-1 rounded border border-white/15 bg-black/30 px-2 py-1 text-[11px] text-zinc-200 hover:bg-white/10"
                  >
                    <Download className="h-3 w-3" />
                    {t('downloadFiltered')}
                  </button>
                </div>
              </div>

              <div
                ref={logViewportRef}
                onScroll={(e) => setLogScrollTop(e.currentTarget.scrollTop)}
                className="min-h-0 flex-1 overflow-auto rounded border border-white/10 bg-[#0d0f14] p-1.5"
                style={{ height: `${viewportHeight}px` }}
              >
                {filteredLogLines.length === 0 ? (
                  <div className="p-3 text-[12px] text-zinc-500">
                    {t('nothingFound')}
                    {logQuery.trim() ? (
                      <button
                        type="button"
                        onClick={() => setLogQuery('')}
                        className="ml-2 rounded border border-white/15 bg-black/30 px-2 py-0.5 text-[11px] text-zinc-300 hover:bg-white/10"
                      >
                        {t('clearSearch')}
                      </button>
                    ) : null}
                  </div>
                ) : (
                  <div className="relative" style={{ height: `${totalVirtualHeight}px` }}>
                    <div
                      className="absolute left-0 right-0"
                      style={{ transform: `translateY(${startIndex * rowHeight}px)` }}
                    >
                      {visibleLogLines.map((line) => (
                        <div
                          key={`${line.idx}-${line.raw}`}
                          className={`mb-1 grid grid-cols-[auto_auto_1fr] gap-2 rounded border px-2 py-1 font-mono text-[11px] text-zinc-200/90 ${levelRowClass(line.level)}`}
                          style={{ height: `${rowHeight}px` }}
                        >
                          <span className="min-w-[3rem] text-right text-zinc-400">{line.idx}</span>
                          <span className="min-w-[4rem] truncate text-zinc-300">{line.source}</span>
                          <span className="truncate whitespace-pre text-zinc-200/85">{line.raw || ' '}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : customFile ? (
          <div className="flex min-h-0 flex-1 flex-col gap-2 pt-3">
            <div className="flex min-h-0 flex-1 flex-col rounded-lg border border-white/[0.07] bg-black/20 p-2">
              <h3 className="mb-2 inline-flex flex-wrap items-center gap-2 text-sm font-semibold text-sky-200">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                <span className="break-all font-mono text-xs text-zinc-200">{customFile.name}</span>
              </h3>
              <div className="mb-2 flex flex-wrap items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCopiedFile('__custom__')
                    void copy(customFile.text)
                  }}
                  className="inline-flex items-center gap-1 rounded border border-white/15 bg-black/30 px-2 py-1 text-[11px] text-zinc-200 hover:bg-white/10"
                >
                  <Copy className="h-3 w-3" />
                  {copiedFile === '__custom__' && copiedId === customFile.text
                    ? t('copied')
                    : t('copy')}
                </button>
                <button
                  type="button"
                  onClick={() => downloadText(customFile.name, customFile.text)}
                  className="inline-flex items-center gap-1 rounded border border-white/15 bg-black/30 px-2 py-1 text-[11px] text-zinc-200 hover:bg-white/10"
                >
                  <Download className="h-3 w-3" />
                  {t('download')}
                </button>
              </div>
              <textarea
                value={customFile.text}
                onChange={(e) => setCustomFile({ name: customFile.name, text: e.target.value })}
                spellCheck={false}
                className="min-h-[min(70vh,calc(100vh-14rem))] flex-1 resize-y rounded border border-white/10 bg-[#0d0f14] px-2 py-1.5 font-mono text-[11px] leading-relaxed text-zinc-200 outline-none focus:border-sky-500/50"
              />
            </div>
          </div>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col gap-3 pt-3">
            <div className="min-h-0 overflow-y-auto pr-1">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex rounded-lg border border-white/10 bg-[#0d0f14] p-0.5">
                  <button
                    type="button"
                    onClick={() => setEditorMode('full')}
                    className={`rounded px-2 py-1 text-[11px] ${
                      editorMode === 'full'
                        ? 'bg-sky-500/20 text-sky-100'
                        : 'text-zinc-400 hover:bg-white/5'
                    }`}
                  >
                    {t('fullTemplateMode')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorMode('quick')}
                    className={`rounded px-2 py-1 text-[11px] ${
                      editorMode === 'quick'
                        ? 'bg-sky-500/20 text-sky-100'
                        : 'text-zinc-400 hover:bg-white/5'
                    }`}
                  >
                    {t('quickParamsMode')}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-200">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {selectedFile}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setCopiedFile(selectedFile)
                      void copy(exports[selectedFile])
                    }}
                    className="inline-flex items-center gap-1 rounded border border-white/15 bg-black/30 px-2 py-1 text-[11px] text-zinc-200 hover:bg-white/10"
                  >
                    <Copy className="h-3 w-3" />
                    {copiedFile === selectedFile && copiedId === exports[selectedFile]
                      ? t('copied')
                      : t('copy')}
                  </button>
                  <button
                    type="button"
                    onClick={() => downloadText(selectedFile, exports[selectedFile])}
                    className="inline-flex items-center gap-1 rounded border border-white/15 bg-black/30 px-2 py-1 text-[11px] text-zinc-200 hover:bg-white/10"
                  >
                    <Download className="h-3 w-3" />
                    {t('download')}
                  </button>
                </div>
              </div>
              {rawFiles[selectedFile] ? (
                <p className="mb-2 text-[10px] text-emerald-300/90">
                  {t('loadedFileHint')}
                </p>
              ) : (
                <p className="mb-2 text-[10px] text-zinc-500">
                  {t('templateHint')}
                </p>
              )}
              {parseErrors[selectedFile] ? (
                <p className="mb-2 rounded border border-red-500/30 bg-red-900/30 px-2 py-1 text-[10px] text-red-200">
                  {t('parseError')}: {parseErrors[selectedFile]}
                </p>
              ) : null}
              {editorMode === 'full' ? (
                <textarea
                  value={exports[selectedFile]}
                  onChange={(e) => setRawFiles((prev) => ({ ...prev, [selectedFile]: e.target.value }))}
                  spellCheck={false}
                  className="min-h-[min(70vh,calc(100vh-15rem))] w-full resize-y rounded border border-white/10 bg-[#0d0f14] px-2 py-1.5 font-mono text-[11px] leading-relaxed text-zinc-200 outline-none focus:border-sky-500/50"
                />
              ) : (
                <div className="space-y-1">
                  {filtered.map((row) => {
                    const current = values[row.id]
                    return (
                      <label
                        key={row.id}
                        className="flex flex-col gap-1 border-b border-white/[0.06] py-2 last:border-b-0"
                      >
                        <span className="text-[12px] font-medium text-zinc-100">
                          {locale === 'ru' ? row.label : row.keyPath}
                        </span>
                        <span className="font-mono text-[10px] text-zinc-500">{row.keyPath}</span>
                        {row.type === 'boolean' ? (
                          <input
                            type="checkbox"
                            checked={Boolean(current)}
                            onChange={(e) =>
                              setValues((prev) => ({ ...prev, [row.id]: e.target.checked }))
                            }
                            className="mt-1 h-4 w-4 rounded border-white/20 bg-[#0d0f14] text-sky-500"
                          />
                        ) : row.type === 'select' ? (
                          <select
                            value={String(current)}
                            onChange={(e) =>
                              setValues((prev) => ({ ...prev, [row.id]: e.target.value }))
                            }
                            className="rounded border border-white/10 bg-[#0d0f14] px-2 py-1.5 text-xs text-zinc-200 outline-none focus:border-sky-500/60"
                          >
                            {row.options?.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </select>
                        ) : row.type === 'number' ? (
                          <input
                            type="number"
                            value={Number(current)}
                            onChange={(e) =>
                              setValues((prev) => ({ ...prev, [row.id]: Number(e.target.value) }))
                            }
                            className="rounded border border-white/10 bg-[#0d0f14] px-2 py-1.5 text-xs text-zinc-200 outline-none focus:border-sky-500/60"
                          />
                        ) : (
                          <input
                            type="text"
                            value={String(current)}
                            onChange={(e) =>
                              setValues((prev) => ({ ...prev, [row.id]: e.target.value }))
                            }
                            className="rounded border border-white/10 bg-[#0d0f14] px-2 py-1.5 text-xs text-zinc-200 outline-none focus:border-sky-500/60"
                          />
                        )}
                        {locale === 'ru' ? (
                          <span className="text-[11px] text-zinc-400">{row.description}</span>
                        ) : null}
                      </label>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
