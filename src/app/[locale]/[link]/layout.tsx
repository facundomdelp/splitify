import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { routing } from '@/i18n/routing'

import { findSeoRouteBySlug, getSeoRoute, getSeoRouteAlternates } from './constants'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; link: string }>
}): Promise<Metadata> {
  const { locale, link } = await params

  const baseUrl = 'https://splitify.me'

  const route = getSeoRoute(locale, link)
  if (!route) return {}

  const canonicalUrl = locale === routing.defaultLocale ? `${baseUrl}/${link}` : `${baseUrl}/${locale}/${link}`

  const languages: Record<string, string> = {}
  getSeoRouteAlternates(route.key).forEach(({ locale: alternate, slug }) => {
    const url = alternate === routing.defaultLocale ? `${baseUrl}/${slug}` : `${baseUrl}/${alternate}/${slug}`

    languages[alternate] = url

    if (alternate === routing.defaultLocale) languages['x-default'] = url
  })

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
      alternateLocale: getSeoRouteAlternates(route.key)
        .map(({ locale: alternate }) => alternate)
        .filter((alternate) => alternate !== locale),
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

  const route = getSeoRoute(locale, seoRoute)

  // notFound no anda por algún motivo!
  if (!route) {
    /* The slug may belong to another language, so send the reader to this note in theirs */
    const foreign = findSeoRouteBySlug(seoRoute)
    const translated = foreign && getSeoRouteAlternates(foreign.route.key).find((entry) => entry.locale === locale)

    redirect(translated ? `/${locale}/${translated.slug}` : '/')
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
