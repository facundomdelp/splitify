import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { routing } from '@/i18n/routing'

import { SEO_LOCALES } from '../[link]/constants'

const baseUrl = 'https://splitify.me'

const localizedPath = (locale: string) => {
  const declared = routing.pathnames['/useful-links'] as Record<string, string>
  const path = declared[locale] ?? '/useful-links'

  return locale === routing.defaultLocale ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'UsefulLinksPage' })

  const canonicalUrl = locale === routing.defaultLocale ? localizedPath(routing.defaultLocale) : localizedPath(locale)

  const languages: Record<string, string> = {}
  SEO_LOCALES.forEach((loc) => {
    languages[loc] = loc === routing.defaultLocale ? localizedPath(routing.defaultLocale) : localizedPath(loc)
  })
  languages['x-default'] = localizedPath(routing.defaultLocale)

  return {
    title: t('Useful Links and Guides'),
    description: t('Here are some useful resources to help you navigate and make the most out of Splitify'),
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: `${t('Useful Links and Guides')} | Splitify`,
      description: t('Here are some useful resources to help you navigate and make the most out of Splitify'),
      url: canonicalUrl,
      siteName: 'Splitify',
      locale: locale,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/Splitify-banner.jpg`,
          width: 1200,
          height: 630,
          alt: 'Splitify - Simplify your group expenses',
        },
      ],
    },
  }
}

export default async function UsefulLinksLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
