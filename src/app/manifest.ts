import { MetadataRoute } from 'next'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  return {
    name: 'Splitify',
    short_name: 'Splitify',
    description: '🤑 Simplify your group expenses with Splitify',
    start_url: '/',
    display: 'standalone',
    background_color: '#052E16',
    theme_color: '#22C55E',
    lang: 'en',
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
        src: '/splitify-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
