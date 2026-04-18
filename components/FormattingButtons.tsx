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
      <label className="block text-sm font-medium text-dark-400 mb-3">
        Formatting:
      </label>
      <div className="flex flex-wrap gap-2">
        {buttons.map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            onClick={() => onToggle(key)}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              formatting[key]
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/50'
                : 'bg-dark-200 text-dark-400 hover:bg-dark-300 hover:text-white'
            }`}
          >
            {formatting[key] && (
              <motion.div
                layoutId={`activeFormatting-${key}`}
                className="absolute inset-0 bg-primary-500 rounded-lg"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Icon className="w-4 h-4" />
              <span className="text-sm">{label}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

