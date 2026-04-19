import { absoluteUrl } from '@/lib/site-url'

export function websiteJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RGB Minecraft',
    description:
      'RGB and gradient text generator for Minecraft (MiniMessage, legacy codes, JSON), YAML or JSON string editor, enchantment and effect ID lists.',
    url: absoluteUrl('/'),
    inLanguage: ['en', 'ru', 'uk'],
    publisher: {
      '@type': 'Person',
      name: 'Zoobastiks',
    },
  }
}
