import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { routing } from '@/i18n/routing'

import { SEO_ROUTES } from './constants'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; link: string }>
}): Promise<Metadata> {
  const { locale, link } = await params

  const baseUrl = 'https://splitify.me'
  const localeSeoRoutes = SEO_ROUTES[locale as keyof typeof SEO_ROUTES]

  const languages: Record<string, string> = {}
  routing.locales.forEach((loc) => {
    languages[loc] = loc === routing.defaultLocale ? `${baseUrl}/${link}` : `${baseUrl}/${loc}/${link}`
  })
  languages['x-default'] = `${baseUrl}/${link}`

  const canonicalUrl = locale === routing.defaultLocale ? `${baseUrl}/${link}` : `${baseUrl}/${locale}/${link}`

  const route = localeSeoRoutes.find((route) => route.slug === link)
  if (!route) return {}

  const { title, description } = route

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
      title: `${title} | Splitify`,
      description: description,
      url: canonicalUrl,
      siteName: 'Splitify',
      locale: locale,
      type: 'website',
      alternateLocale: routing.locales.filter((loc) => loc !== locale),
      images: [
        {
          url: `${baseUrl}/Splitify-banner.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Splitify`,
      description: description,
      images: [`${baseUrl}/Splitify-banner.jpg`],
    },
  }
}

export default async function SeoRouteLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string; link: string }>
}>) {
  const { locale, link: seoRoute } = await params

  const localeSeoRoutes = SEO_ROUTES[locale as keyof typeof SEO_ROUTES]
  const route = localeSeoRoutes?.find((r: { slug: string }) => r.slug === seoRoute)

  // notFound no anda por algún motivo!
  if (!route) {
    redirect('/')
  }

  const baseUrl = 'https://splitify.me'
  const canonicalUrl = locale === routing.defaultLocale ? `${baseUrl}/${seoRoute}` : `${baseUrl}/${locale}/${seoRoute}`

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: route.title,
    description: route.description,
    url: canonicalUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Splitify',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/splitify-512x512.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  }

  return (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {children}
    </>
  )
}
