/** @type {import('next').NextConfig} */
// Для GitHub Pages в CI задайте BASE_PATH=/имя-репозитория (workflow делает это автоматически).
const basePath = String(process.env.BASE_PATH ?? '').trim()

const siteUrlRaw = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zoobastik.me'
const siteUrl =
  String(siteUrlRaw)
    .trim()
    .replace(/\/+$/, '') || 'https://zoobastik.me'

const nextConfig = {
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  output: 'export',
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
}

module.exports = nextConfig
