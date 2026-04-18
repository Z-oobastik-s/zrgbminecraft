'use client'

import { useState, useEffect } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { Generator } from '@/components/Generator'
import { Header } from '@/components/Header'

const locales = ['ru', 'ua', 'en'] as const
type Locale = (typeof locales)[number]

function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export default function HomePage() {
  const [locale, setLocale] = useState<Locale>('ru')
  const [messages, setMessages] = useState<any>(null)

  useEffect(() => {
    import(`../messages/${locale}.json`).then((mod) => {
      setMessages(mod.default)
    })
  }, [locale])

  if (!messages) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-dark-400">Loading...</div>
      </div>
    )
  }

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <main className="min-h-screen">
        <Header
          currentLocale={locale}
          onLocaleChange={(next) => {
            if (isLocale(next)) setLocale(next)
          }}
        />
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <Generator />
        </div>
      </main>
    </NextIntlClientProvider>
  )
}

