import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/groups/'],
      },
    ],
    sitemap: 'https://splitify.me/sitemap.xml',
    host: 'https://splitify.me',
  }
}
