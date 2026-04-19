'use client'

import { useMemo } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { MINECRAFT_EFFECTS } from '@/lib/minecraft-effects'
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
    tone: 'pos' | 'neg'
  ) => (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-[#161922]">
      <h3 className="shrink-0 border-b border-white/[0.06] bg-[#141722] px-2 py-1 text-center text-[10px] font-semibold uppercase tracking-wide text-zinc-400 sm:text-[11px]">
        {title}
      </h3>
      <ul className="min-h-0 flex-1 space-y-0 overflow-hidden py-0.5">
        {rows.map((row) => {
          const active = copiedId === row.id
          const nameClass =
            tone === 'pos'
              ? 'text-emerald-400/95'
              : 'text-red-400/95'
          return (
            <li
              key={row.id}
              className="flex items-baseline justify-between gap-1 border-b border-white/[0.03] px-2 py-[0.12rem] last:border-0 sm:py-[0.2rem]"
            >
              <span className={`min-w-0 shrink text-[clamp(8px,1.05vmin,11px)] leading-snug ${nameClass}`}>
                {labelForLocale(row, locale)}
              </span>
              <button
                type="button"
                onClick={() => void copy(row.id)}
                className={`shrink-0 rounded px-1 font-mono text-[clamp(8px,1.05vmin,10px)] text-amber-300/95 underline decoration-amber-500/25 decoration-dotted underline-offset-2 hover:bg-white/5 ${
                  active ? 'bg-emerald-500/15 text-emerald-300' : ''
                }`}
                title={row.id}
              >
                {active ? t('copied') : `(${row.id})`}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )

  return (
    <section className="flex min-h-0 flex-1 flex-col gap-1 overflow-hidden">
      <div className="shrink-0 text-center">
        <h2 className="text-sm font-semibold tracking-tight text-sky-300 sm:text-base">
          {t('title')}
        </h2>
        <p className="text-[10px] text-zinc-500">{t('hint')}</p>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-2 overflow-hidden sm:gap-3">
        {renderColumn(t('positive'), positive, 'pos')}
        {renderColumn(t('negative'), negative, 'neg')}
      </div>
    </section>
  )
}
