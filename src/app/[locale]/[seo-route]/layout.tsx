import { routing } from '@/i18n/routing'
import { SEO_ROUTES } from '@/seo/seoRoutes'
import { Locale } from '@/types/Common'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; 'seo-route': string }>
}): Promise<Metadata> {
  const { locale, 'seo-route': seoRoute } = await params
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ''

  const localeSeoRoute = SEO_ROUTES[locale]

  const languages: Record<string, string> = {}
  routing.locales.forEach((loc) => {
    languages[loc] = `${baseUrl}/${loc}/${seoRoute}`
  })

  return {
    title: {
      template: `%s | Splitify`,
      default: localeSeoRoute[seoRoute as keyof typeof localeSeoRoute],
    },
    // description: localeSeoRoute.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}/${seoRoute}`,
      languages,
    },
    openGraph: {
      title: localeSeoRoute[seoRoute as keyof typeof localeSeoRoute],
      // description: localeSeoRoute.description,
      url: `${baseUrl}/${locale}/${seoRoute}`,
      siteName: 'Splitify',
      locale: locale,
      type: 'website',
      alternateLocale: routing.locales.filter((loc) => loc !== locale),
    },
    twitter: {
      card: 'summary_large_image',
      title: localeSeoRoute[seoRoute as keyof typeof localeSeoRoute],
      // description: localeSeoRoute.description ,
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
  const awaitedParams = await params

  const isValidRoute = Object.keys(SEO_ROUTES[awaitedParams.locale]).includes(awaitedParams['seo-route'])

  if (!isValidRoute) {
    redirect('/')
  }

  return children
}
