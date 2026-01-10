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
    <header className="glass-effect sticky top-0 z-50 border-b border-dark-200/50">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-primary-400 animate-pulse-slow" />
            <div>
              <h1 className="text-2xl font-bold gradient-text">
                {t('title')}
              </h1>
              <p className="text-sm text-dark-500">{t('subtitle')}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher currentLocale={currentLocale} onLocaleChange={onLocaleChange} />
            <div className="text-xs text-dark-500">
              {t('author')} © {t('year')}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

