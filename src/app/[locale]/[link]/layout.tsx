import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { routing } from '@/i18n/routing'

import { Locale } from '@/types/common-types'

import { SEO_ROUTES } from './constants'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; link: string }>
}): Promise<Metadata> {
  const { locale, link } = await params

  const baseUrl = 'https://splitify.me'
  const localeSeoRoutes = SEO_ROUTES[locale]

  const languages: Record<Locale, string> = {} as Record<Locale, string>
  routing.locales.forEach((loc) => {
    languages[loc] = loc === routing.defaultLocale ? `${baseUrl}/${link}` : `${baseUrl}/${loc}/${link}`
  })

  const canonicalUrl = locale === routing.defaultLocale ? `${baseUrl}/${link}` : `${baseUrl}/${locale}/${link}`

  const { title, description } = localeSeoRoutes.find((route) => route.slug === link)!

  return {
    title: {
      template: `%s | Splitify`,
      default: title,
    },
    description: description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title,
      description: description,
      url: canonicalUrl,
      siteName: 'Splitify',
      locale: locale,
      type: 'website',
      alternateLocale: routing.locales.filter((loc) => loc !== locale),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description,
    },
  }
}

export default async function SeoRouteLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: Locale; link: string }>
}>) {
  const { locale, link: seoRoute } = await params

  const isValidRoute = SEO_ROUTES[locale].some((route) => route.slug === seoRoute)

  // notFound no anda por algún motivo!
  if (!isValidRoute) {
    redirect('/')
  }

  return children
}
