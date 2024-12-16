import { SEO_ROUTES } from '@/lib/seoRoutes'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'es', 'pt']

  // General routes that exist for all locales
  const commonRoutes = ['/']

  // Locale-specific routes
  const localeRoutes = {
    en: Object.keys(SEO_ROUTES.en).map((route) => `/${route}`),
    es: Object.keys(SEO_ROUTES.es).map((route) => `/${route}`),
    pt: Object.keys(SEO_ROUTES.pt).map((route) => `/${route}`),
  }

  const sitemapEntries: MetadataRoute.Sitemap = locales.flatMap((locale) => [
    // Common routes for all locales
    ...commonRoutes.map((route) => ({
      url: `https://splitify.me/${locale}${route === '/' ? '' : route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '/' ? 1 : 0.7,
      alternateRefs: locales
        .filter((altLocale) => altLocale !== locale)
        .map((altLocale) => ({
          href: `https://splitify.me/${altLocale}${route === '/' ? '' : route}`,
          hreflang: altLocale,
        })),
    })),

    // Locale-specific routes
    ...localeRoutes[locale as keyof typeof localeRoutes].map((route) => ({
      url: `https://splitify.me/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternateRefs: locales
        .filter((altLocale) => altLocale !== locale)
        .map((altLocale) => {
          // Try to find an equivalent route in other locales
          const altRoute = localeRoutes[altLocale as keyof typeof localeRoutes].find(
            (r) => r.replace(/^\//, '') === route.replace(/^\//, ''),
          )
          return {
            href: `https://splitify.me/${altLocale}${altRoute || ''}`,
            hreflang: altLocale,
          }
        }),
    })),
  ]) as MetadataRoute.Sitemap

  return sitemapEntries
}
