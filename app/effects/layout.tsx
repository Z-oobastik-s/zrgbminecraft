import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Minecraft effect IDs | RGB Minecraft',
  description: 'Minecraft status effect IDs for commands. Click to copy.',
}

export default function EffectsLayout({ children }: { children: ReactNode }) {
  return children
}
