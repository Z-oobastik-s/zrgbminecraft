'use client'

import { useMemo } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { MINECRAFT_EFFECTS } from '@/lib/minecraft-effects'
import { EffectGlyph } from '@/components/icons/EffectGlyphs'
import { useCopyFeedback } from '@/hooks/useCopyFeedback'

function labelForLocale(
  row: (typeof MINECRAFT_EFFECTS)[0],
  locale: string
): string {
  if (locale === 'en') return row.names.en
  if (locale === 'ua') return row.names.ua
  return row.names.ru
}

export function EffectsView() {
  const t = useTranslations('effectsPage')
  const locale = useLocale()
  const { copiedId, copy } = useCopyFeedback()

  const { positive, negative } = useMemo(() => {
    const pos = MINECRAFT_EFFECTS.filter((e) => e.kind === 'positive')
    const neg = MINECRAFT_EFFECTS.filter((e) => e.kind === 'negative')
    return { positive: pos, negative: neg }
  }, [])

  const renderColumn = (
    title: string,
    rows: typeof MINECRAFT_EFFECTS,
    kind: 'positive' | 'negative'
  ) => (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-white/[0.07] bg-[#141722] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
      <h3 className="shrink-0 border-b border-white/[0.07] bg-[#131722] px-3 py-1.5 text-center text-[10px] font-semibold uppercase tracking-wide text-zinc-400 sm:text-[11px]">
        {title}
      </h3>
      <ul className="min-h-0 flex-1 space-y-0 overflow-hidden px-1.5 py-1 sm:px-2">
        {rows.map((row) => {
          const active = copiedId === row.id
          const nameClass =
            kind === 'positive'
              ? 'text-emerald-300/95'
              : 'text-rose-300/95'
          return (
            <li key={row.id}>
              <button
                type="button"
                onClick={() => void copy(row.id)}
                className="flex w-full items-center gap-2 rounded-lg px-1.5 py-[0.28rem] text-left transition-colors hover:bg-white/[0.05] sm:gap-2.5 sm:py-1"
              >
                <span className="shrink-0 opacity-95">
                  <EffectGlyph id={row.id} kind={kind} />
                </span>
                <span
                  className={`min-w-0 flex-1 truncate text-[11px] leading-snug sm:text-xs ${nameClass}`}
                >
                  {labelForLocale(row, locale)}
                </span>
                <span
                  className={`shrink-0 rounded-md border px-1.5 py-0.5 font-mono text-[10px] sm:text-[11px] ${
                    active
                      ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-200'
                      : 'border-amber-500/25 bg-amber-500/[0.07] text-amber-200/90'
                  }`}
                >
                  {active ? t('copied') : row.id}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )

  return (
    <section className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col gap-2 overflow-hidden px-0 sm:gap-2.5">
      <header className="shrink-0 text-center">
        <h2 className="text-base font-semibold tracking-tight text-sky-300 sm:text-lg">
          {t('title')}
        </h2>
        <p className="text-[11px] text-zinc-500">{t('hint')}</p>
      </header>
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-2.5 overflow-hidden md:grid-cols-2 md:gap-3">
        {renderColumn(t('positive'), positive, 'positive')}
        {renderColumn(t('negative'), negative, 'negative')}
      </div>
    </section>
  )
}
