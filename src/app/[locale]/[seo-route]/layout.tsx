import { Metadata } from 'next'

import { routing } from '@/i18n/routing'

import { Locale } from '@/types/common-types'

import { SEO_ROUTES } from '@/seo/seoRoutes'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; 'seo-route': string }>
}): Promise<Metadata> {
  const { locale, 'seo-route': seoRoute } = await params

  const baseUrl = 'https://splitify.me'
  const localeSeoRoute = SEO_ROUTES[locale]

  const languages: Record<Locale, string> = {} as Record<Locale, string>
  routing.locales.forEach((loc) => {
    languages[loc] = loc === routing.defaultLocale ? `${baseUrl}/${seoRoute}` : `${baseUrl}/${loc}/${seoRoute}`
  })

  const canonicalUrl = locale === routing.defaultLocale ? `${baseUrl}/${seoRoute}` : `${baseUrl}/${locale}/${seoRoute}`

  return {
    title: {
      template: `%s | Splitify`,
      default: localeSeoRoute[seoRoute as keyof typeof localeSeoRoute],
    },
    // description: localeSeoRoute.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: localeSeoRoute[seoRoute as keyof typeof localeSeoRoute],
      // description: localeSeoRoute.description,
      url: canonicalUrl,
      siteName: 'Splitify',
      locale: locale,
      type: 'website',
      alternateLocale: routing.locales.filter((loc) => loc !== locale),
    },
    twitter: {
      card: 'summary_large_image',
      title: localeSeoRoute[seoRoute as keyof typeof localeSeoRoute],
      // description: localeSeoRoute.description,
    },
  }
}

export default async function SeoRouteLayout({
  children,
  // params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: Locale; 'seo-route': string }>
}>) {
  // const awaitedParams = await params

  // // const isValidRoute = Object.keys(SEO_ROUTES[awaitedParams.locale]).includes(awaitedParams['seo-route'])

  // // if (!isValidRoute) {
  // //   redirect('/')
  // // }

  return children
}
