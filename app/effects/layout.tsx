import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { EFFECTS_KEYWORDS } from '@/lib/seo-keywords'
import { absoluteUrl } from '@/lib/site-url'

const desc =
  'Minecraft status effect IDs for commands. Click to copy. | ID эффектов для команд. | ID ефектів для команд.'

export const metadata: Metadata = {
  title: 'Minecraft effect IDs',
  description: desc,
  keywords: EFFECTS_KEYWORDS,
  alternates: { canonical: absoluteUrl('/effects') },
  openGraph: {
    title: 'Minecraft effect IDs | RGB Minecraft',
    description: desc,
    url: absoluteUrl('/effects'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Minecraft effect IDs | RGB Minecraft',
    description: desc,
  },
}

export default function EffectsLayout({ children }: { children: ReactNode }) {
  return children
}
