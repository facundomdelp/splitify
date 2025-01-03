import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'es', 'pt']

  // General routes that exist for all locales
  const commonRoutes = ['/']

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
  ]) as MetadataRoute.Sitemap

  return sitemapEntries
}
