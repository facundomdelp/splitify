import { SEO_LOCALES, SEO_ROUTES, getSeoRouteAlternates } from '@/app/[locale]/[link]/constants'

import type { MetadataRoute } from 'next'

import { routing } from '@/i18n/routing'

const locales = ['en', 'es', 'pt-BR', 'pt-PT', 'zh-CN', 'zh-TW', 'ar', 'fr', 'ja', 'ru', 'de', 'id']
const defaultLocale = 'en'

const baseUrl = 'https://splitify.me'
const lastModified = new Date('2026-08-22')

// Static routes
const staticRoutes = ['', 'faq', 'useful-links']

/* Static routes are translated per locale, so the URL has to come from the routing config */
function buildUrl(locale: string, route: string) {
  if (!route) return locale === defaultLocale ? baseUrl : `${baseUrl}/${locale}`

  const pathnames = routing.pathnames as Record<string, string | Record<string, string>>
  const declared = pathnames[`/${route}`]
  const path = typeof declared === 'string' ? declared : (declared?.[locale] ?? `/${route}`)

  return locale === defaultLocale ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticRoutes.flatMap((route) => {
    /* Useful Links only exists where there are notes to list */
    const routeLocales = route === 'useful-links' ? locales.filter((locale) => SEO_LOCALES.includes(locale)) : locales

    return routeLocales.map((locale) => {
      const url = buildUrl(locale, route)

      // Generate alternate links for all locales + x-default
      const alternates = routeLocales.reduce(
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

      /* Each language publishes this note under its own slug, so alternates resolve through the shared key */
      const translations = getSeoRouteAlternates(route.key)

      const languages = translations.reduce<Record<string, string>>(
        (acc, translation) => ({
          ...acc,
          [translation.locale]:
            translation.locale === defaultLocale
              ? `${baseUrl}/${translation.slug}`
              : `${baseUrl}/${translation.locale}/${translation.slug}`,
        }),
        {},
      )

      const fallback = translations.find((translation) => translation.locale === defaultLocale)

      if (fallback) languages['x-default'] = `${baseUrl}/${fallback.slug}`

      return {
        url,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
        alternates: { languages },
      }
    })
  })

  return [...staticEntries, ...seoRoutesEntries]
}
