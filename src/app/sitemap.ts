import { SEO_ROUTES } from '@/app/[locale]/[link]/constants'

import type { MetadataRoute } from 'next'

const locales = ['en', 'es', 'pt-BR', 'pt-PT', 'zh-CN', 'zh-TW', 'ar', 'fr', 'ja', 'ru', 'de', 'id']
const defaultLocale = 'en'

const baseUrl = 'https://splitify.me'
const lastModified = new Date('2026-08-22')

// Static routes
const staticRoutes = ['', 'faq', 'useful-links']

function buildUrl(locale: string, route: string) {
  const path = route ? `/${route}` : ''
  return locale === defaultLocale ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticRoutes.flatMap((route) => {
    return locales.map((locale) => {
      const url = buildUrl(locale, route)

      // Generate alternate links for all locales + x-default
      const alternates = locales.reduce(
        (acc, altLocale) => {
          acc[altLocale] = buildUrl(altLocale, route)
          return acc
        },
        {} as Record<string, string>,
      )

      // x-default points to the default locale version
      alternates['x-default'] = buildUrl(defaultLocale, route)

      return {
        url,
        lastModified,
        changeFrequency: route === '' ? ('daily' as const) : ('weekly' as const),
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: alternates,
        },
      }
    })
  })

  const seoRoutesEntries = Object.entries(SEO_ROUTES).flatMap(([locale, routes]) => {
    return routes.map((route) => {
      const url = locale === defaultLocale ? `${baseUrl}/${route.slug}` : `${baseUrl}/${locale}/${route.slug}`

      return {
        url,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }
    })
  })

  return [...staticEntries, ...seoRoutesEntries]
}
