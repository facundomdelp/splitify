import { MetadataRoute } from 'next'
import { getTranslations } from 'next-intl/server'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const locale = 'en'

  const t = await getTranslations({
    namespace: 'Manifest',
    locale,
  })

  return {
    name: 'Splitify',
    short_name: 'Splitify',
    description: t('🤑 Simplify your group expenses with Splitify'),
    start_url: '/',
    display: 'standalone',
    background_color: '#052E16',
    theme_color: '#22C55E',
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
    ],
  }
}
