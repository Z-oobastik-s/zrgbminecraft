'use client'

import { useTranslations } from 'next-intl'
import { Bold, Italic, Underline, Strikethrough, Eye } from 'lucide-react'
import { FormattingOptions } from '@/lib/rgb-generator'
import { motion } from 'framer-motion'

interface FormattingButtonsProps {
  formatting: FormattingOptions
  onToggle: (key: keyof FormattingOptions) => void
}

export function FormattingButtons({
  formatting,
  onToggle,
}: FormattingButtonsProps) {
  const t = useTranslations('formatting')

  const buttons = [
    { key: 'bold' as const, icon: Bold, label: t('bold') },
    { key: 'italic' as const, icon: Italic, label: t('italic') },
    { key: 'underline' as const, icon: Underline, label: t('underline') },
    {
      key: 'strikethrough' as const,
      icon: Strikethrough,
      label: t('strikethrough'),
    },
    { key: 'obfuscated' as const, icon: Eye, label: t('obfuscated') },
  ]

  return (
    <div>
      <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-dark-500">
        {t('sectionTitle')}
      </label>
      <div className="flex flex-wrap gap-1">
        {buttons.map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => onToggle(key)}
            className={`relative flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-all duration-200 ${
              formatting[key]
                ? 'bg-primary-500 text-white shadow-md shadow-primary-500/40'
                : 'bg-dark-200 text-dark-400 hover:bg-dark-300 hover:text-white'
            }`}
          >
            {formatting[key] && (
              <motion.div
                layoutId={`activeFormatting-${key}`}
                className="absolute inset-0 rounded-md bg-primary-500"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1">
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span className="hidden sm:inline">{label}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

