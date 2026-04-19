import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Minecraft enchantment IDs | RGB Minecraft',
  description: 'All Minecraft Java enchantment registry IDs with max levels. Click to copy.',
}

export default function EnchantLayout({ children }: { children: ReactNode }) {
  return children
}
