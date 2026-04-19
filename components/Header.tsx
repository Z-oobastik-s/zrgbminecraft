'use client'

import { useTranslations } from 'next-intl'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Sparkles } from 'lucide-react'

interface HeaderProps {
  currentLocale: string
  onLocaleChange: (locale: string) => void
}

export function Header({ currentLocale, onLocaleChange }: HeaderProps) {
  const t = useTranslations('common')

  return (
    <header className="z-50 shrink-0 border-b border-dark-200/50 bg-dark-50/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-2 py-1.5 sm:px-3">
        <div className="flex min-w-0 items-center gap-2">
          <Sparkles className="h-6 w-6 shrink-0 text-primary-400" />
          <div className="min-w-0">
            <h1 className="truncate text-base font-bold leading-tight gradient-text sm:text-lg">
              {t('title')}
            </h1>
            <p className="truncate text-[10px] text-dark-500 sm:text-xs">
              {t('subtitle')}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <LanguageSwitcher currentLocale={currentLocale} onLocaleChange={onLocaleChange} />
          <div className="hidden text-[10px] text-dark-500 sm:block sm:text-xs">
            {t('author')} © {t('year')}
          </div>
        </div>
      </div>
    </header>
  )
}

