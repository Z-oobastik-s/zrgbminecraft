import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RGB Minecraft - Text Generator',
  description: 'Powerful RGB text generator for Minecraft plugins and chat',
  keywords: 'minecraft, rgb, text generator, color codes, minimessage',
  authors: [{ name: 'Zoobastiks' }],
  creator: 'Zoobastiks',
  openGraph: {
    title: 'RGB Minecraft - Text Generator',
    description: 'Powerful RGB text generator for Minecraft plugins and chat',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="dark">
      <body className="h-[100dvh] overflow-hidden bg-gradient-to-br from-dark-50 via-dark-50 to-dark-100">
        {children}
      </body>
    </html>
  )
}

