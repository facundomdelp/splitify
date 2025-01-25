import { MetadataRoute } from 'next'
import { getTranslations } from 'next-intl/server'

import { Locale } from '@/types/common-types'

export default async function manifest({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<MetadataRoute.Manifest> {
  const { locale } = await params

  const t = await getTranslations({
    namespace: 'Manifest',
    locale,
  })

  return {
    name: t('name'),
    short_name: t('short_name'),
    description: t('description'),
    start_url: '/',
    display: 'standalone',
    background_color: '#052E16',
    theme_color: '#22C55E',
    lang: locale,
    orientation: 'portrait',
    categories: ['finance', 'tools'],
    icons: [
      {
        src: '/splitify-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/splitify-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/splitify-maskable.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
