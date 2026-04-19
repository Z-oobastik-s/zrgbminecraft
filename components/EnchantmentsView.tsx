'use client'

import { useMemo } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { MINECRAFT_ENCHANTMENTS } from '@/lib/minecraft-enchantments'
import { EnchantmentItemIcons } from '@/components/EnchantmentItemIcons'
import { useCopyFeedback } from '@/hooks/useCopyFeedback'

function nameForLocale(
  row: (typeof MINECRAFT_ENCHANTMENTS)[0],
  locale: string
): string {
  if (locale === 'en') return row.names.en
  if (locale === 'ua') return row.names.ua
  return row.names.ru
}

export function EnchantmentsView() {
  const t = useTranslations('enchantPage')
  const locale = useLocale()
  const { copiedId, copy } = useCopyFeedback()

  const [left, right] = useMemo(() => {
    const all = MINECRAFT_ENCHANTMENTS
    const mid = Math.ceil(all.length / 2)
    return [all.slice(0, mid), all.slice(mid)] as const
  }, [])

  const renderTable = (rows: typeof MINECRAFT_ENCHANTMENTS) => (
    <table className="w-full table-fixed border-collapse text-[clamp(8px,1.05vmin,11px)] leading-tight">
      <thead>
        <tr className="border-b border-white/[0.08] bg-[#141722] text-left text-[9px] font-semibold uppercase tracking-wide text-zinc-500 sm:text-[10px]">
          <th className="w-[36%] px-1 py-0.5 sm:px-1.5 sm:py-1">{t('colName')}</th>
          <th className="w-[30%] px-1 py-0.5 sm:px-1.5 sm:py-1">{t('colId')}</th>
          <th className="w-[22%] px-1 py-0.5 text-right sm:px-1.5 sm:py-1">
            {t('colItems')}
          </th>
          <th className="w-[12%] px-0.5 py-0.5 text-center sm:py-1">{t('colMax')}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          const label = nameForLocale(row, locale)
          const active = copiedId === row.id
          return (
            <tr
              key={row.id}
              className="border-b border-white/[0.04] odd:bg-black/10 even:bg-transparent"
            >
              <td className="px-1 py-[0.15rem] text-zinc-200 sm:px-1.5 sm:py-0.5">
                {label}
              </td>
              <td className="px-1 py-[0.15rem] sm:px-1.5 sm:py-0.5">
                <button
                  type="button"
                  onClick={() => void copy(row.id)}
                  className={`w-full truncate rounded px-0.5 text-left font-mono text-orange-400/95 underline decoration-orange-500/30 decoration-dotted underline-offset-2 transition-colors hover:bg-white/5 hover:decoration-orange-400 ${
                    active ? 'bg-emerald-500/15 text-emerald-300' : ''
                  }`}
                  title={row.id}
                >
                  {active ? t('copied') : row.id}
                </button>
              </td>
              <td className="px-0 py-[0.15rem] text-right sm:px-1 sm:py-0.5">
                <EnchantmentItemIcons items={row.items} />
              </td>
              <td className="px-0.5 py-[0.15rem] text-center tabular-nums text-zinc-400 sm:py-0.5">
                {row.max}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
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
        <div className="panel min-h-0 overflow-hidden rounded-xl border border-white/[0.06] bg-[#161922]">
          <div className="h-full overflow-hidden">{renderTable(left)}</div>
        </div>
        <div className="panel min-h-0 overflow-hidden rounded-xl border border-white/[0.06] bg-[#161922]">
          <div className="h-full overflow-hidden">{renderTable(right)}</div>
        </div>
      </div>
    </section>
  )
}
