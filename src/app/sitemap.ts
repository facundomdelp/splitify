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

// export default function sitemap(): MetadataRoute.Sitemap {

//   // General routes that exist for all locales
//   const commonRoutes = ['/']

//   // Locale-specific routes
//   const localeRoutes = {
//     en: Object.keys(SEO_ROUTES.en).map((route) => `/${route}`),
//     es: Object.keys(SEO_ROUTES.es).map((route) => `/${route}`),
//     pt: Object.keys(SEO_ROUTES.pt).map((route) => `/${route}`),
//   }

//   const sitemapEntries: MetadataRoute.Sitemap = locales.flatMap((locale) => [
//     // Common routes for all locales
//     ...commonRoutes.map((route) => ({
//       url: `https://splitify.me/${locale}${route === '/' ? '' : route}`,
//       lastModified: new Date(),
//       changeFrequency: 'weekly',
//       priority: route === '/' ? 1 : 0.7,
//       alternateRefs: locales
//         .filter((altLocale) => altLocale !== locale)
//         .map((altLocale) => ({
//           href: `https://splitify.me/${altLocale}${route === '/' ? '' : route}`,
//           hreflang: altLocale,
//         })),
//     })),

//     // Locale-specific routes
//     ...localeRoutes[locale as keyof typeof localeRoutes].map((route) => ({
//       url: `https://splitify.me/${locale}${route}`,
//       lastModified: new Date(),
//       changeFrequency: 'weekly',
//       priority: 0.8,
//       alternateRefs: locales
//         .filter((altLocale) => altLocale !== locale)
//         .map((altLocale) => {
//           // Try to find an equivalent route in other locales
//           const altRoute = localeRoutes[altLocale as keyof typeof localeRoutes].find(
//             (r) => r.replace(/^\//, '') === route.replace(/^\//, ''),
//           )
//           return {
//             href: `https://splitify.me/${altLocale}${altRoute || ''}`,
//             hreflang: altLocale,
//           }
//         }),
//     })),
//   ]) as MetadataRoute.Sitemap

//   return [
//     // Root Entry
//     // {
//     //   url: 'https://splitify.me',
//     //   lastModified: new Date(),
//     //   changeFrequency: 'weekly',
//     //   priority: 1,
//     // },
//     ...sitemapEntries,
//   ]
// }
