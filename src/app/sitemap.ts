import { SEO_ROUTES } from '@/seo/seoRoutes'

import type { MetadataRoute } from 'next'

const locales = ['en', 'es', 'pt']
const defaultLocale = 'en'

const baseUrl = 'https://splitify.me'

// Static routes
const staticRoutes = ['']

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticRoutes.flatMap((route) => {
    return locales.map((locale) => {
      // For the default locale (en), don't include the locale prefix
      const url = locale === defaultLocale ? `${baseUrl}/${route}` : `${baseUrl}/${locale}/${route}`

      // Generate alternate links for all locales
      const alternates = locales.reduce(
        (acc, altLocale) => {
          const altUrl = altLocale === defaultLocale ? `${baseUrl}/${route}` : `${baseUrl}/${altLocale}/${route}`
          acc[altLocale] = altUrl
          return acc
        },
        {} as Record<string, string>,
      )

      return {
        url,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8, // Homepage has higher priority
        alternates: {
          languages: alternates,
        },
      }
    })
  })

  // Generate sitemap entries for locale-specific routes
  const localeSpecificEntries = Object.entries(SEO_ROUTES).flatMap(([locale, routes]) => {
    return Object.keys(routes).map((route) => {
      // For the default locale (en), don't include the locale prefix
      const url = locale === 'en' ? `${baseUrl}/${route}` : `${baseUrl}/${locale}/${route}`

      return {
        url,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8, // Adjust priority as needed
      }
    })
  })

  return [...staticEntries, ...localeSpecificEntries]
}
