import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { ENCHANT_KEYWORDS } from '@/lib/seo-keywords'
import { absoluteUrl } from '@/lib/site-url'

const desc =
  'All Minecraft Java enchantment registry IDs with max levels. Click to copy. | Все ID зачарований Java Edition с макс. уровнем. | Усі ID зачарувань Java Edition.'

export const metadata: Metadata = {
  title: 'Minecraft enchantment IDs',
  description: desc,
  keywords: ENCHANT_KEYWORDS,
  alternates: { canonical: absoluteUrl('/enchant') },
  openGraph: {
    title: 'Minecraft enchantment IDs | RGB Minecraft',
    description: desc,
    url: absoluteUrl('/enchant'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Minecraft enchantment IDs | RGB Minecraft',
    description: desc,
  },
}

export default function EnchantLayout({ children }: { children: ReactNode }) {
  return children
}
