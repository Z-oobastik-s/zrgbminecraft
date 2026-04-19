import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { SERVER_KEYWORDS } from '@/lib/seo-keywords'
import { absoluteUrl } from '@/lib/site-url'

const desc =
  'Панель редактирования главных настроек Minecraft-сервера: server.properties, bukkit.yml, spigot.yml и Paper-конфиги с объяснением параметров.'

export const metadata: Metadata = {
  title: 'Minecraft server settings panel',
  description: desc,
  keywords: SERVER_KEYWORDS,
  alternates: { canonical: absoluteUrl('/server') },
  openGraph: {
    title: 'Minecraft server settings panel | RGB Minecraft',
    description: desc,
    url: absoluteUrl('/server'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Minecraft server settings panel | RGB Minecraft',
    description: desc,
  },
}

export default function ServerLayout({ children }: { children: ReactNode }) {
  return children
}
