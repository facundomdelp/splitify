import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { routing } from '@/i18n/routing'

import { Locale } from '@/types/common-types'

import { SEO_ROUTES } from './constants'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; 'seo-route': string }>
}): Promise<Metadata> {
  const { locale, 'seo-route': seoRoute } = await params

  const baseUrl = 'https://splitify.me'
  const localeSeoRoutes = SEO_ROUTES[locale]

  const t = await getTranslations({ locale, namespace: 'Metadata' })

  const languages: Record<Locale, string> = {} as Record<Locale, string>
  routing.locales.forEach((loc) => {
    languages[loc] = loc === routing.defaultLocale ? `${baseUrl}/${seoRoute}` : `${baseUrl}/${loc}/${seoRoute}`
  })

  const canonicalUrl = locale === routing.defaultLocale ? `${baseUrl}/${seoRoute}` : `${baseUrl}/${locale}/${seoRoute}`

  const title = localeSeoRoutes.find((route) => route.slug === seoRoute)?.title || t('title')

  return {
    title: {
      template: `%s | Splitify`,
      default: title,
    },
    // description: localeSeoRoute.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title,
      // description: localeSeoRoute.description,
      url: canonicalUrl,
      siteName: 'Splitify',
      locale: locale,
      type: 'website',
      alternateLocale: routing.locales.filter((loc) => loc !== locale),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      // description: localeSeoRoute.description,
    },
  }
}

export default async function SeoRouteLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: Locale; 'seo-route': string }>
}>) {
  const { locale, 'seo-route': seoRoute } = await params

  const isValidRoute = SEO_ROUTES[locale].some((route) => route.slug === seoRoute)

  if (!isValidRoute) {
    notFound()
  }

  return children
}
