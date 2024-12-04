import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'es']

  const routes = ['/']

  const sitemapEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `https://splitify.me/${locale}${route === '/' ? '' : route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '/' ? 1 : 0.8,
      alternateRefs: locales
        .filter((altLocale) => altLocale !== locale)
        .map((altLocale) => ({
          href: `https://splitify.me/${altLocale}${route === '/' ? '' : route}`,
          hreflang: altLocale,
        })),
    })),
  )

  return sitemapEntries
}
