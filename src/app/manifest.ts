import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Splitify',
    short_name: 'Splitify',
    description: '🤑 Simplifica tus gastos en grupo con Splitify',
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
    ],
  }
}
