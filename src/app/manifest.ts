import { MetadataRoute } from 'next'
import { getTranslations } from 'next-intl/server'

const DEFAULT_LOCALE = 'en'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations({
    namespace: 'Manifest',
    DEFAULT_LOCALE,
  })

  return {
    name: t('name'),
    short_name: t('short_name'),
    description: t('description'),
    start_url: '/',
    display: 'standalone',
    background_color: '#052E16',
    theme_color: '#22C55E',
    lang: DEFAULT_LOCALE,
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
