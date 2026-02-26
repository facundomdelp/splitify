import { MetadataRoute } from 'next'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  return {
    name: 'Splitify - Simplify Your Group Expenses',
    short_name: 'Splitify',
    description:
      'Splitify makes splitting group expenses easy! Add participants, calculate balances, and share costs fairly. No account needed.',
    start_url: '/',
    id: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#052E16',
    theme_color: '#22C55E',
    lang: 'en',
    dir: 'ltr',
    orientation: 'portrait',
    categories: ['finance', 'utilities', 'productivity'],
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
      {
        src: '/splitify-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: '/SplitiQuick-en.png',
        sizes: '1170x2532',
        type: 'image/png',
        label: 'Splitify Quick Split',
      },
      {
        src: '/SplitiGroups-en.png',
        sizes: '1170x2532',
        type: 'image/png',
        label: 'Splitify Groups',
      },
    ],
  }
}
