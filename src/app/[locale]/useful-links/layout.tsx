import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { routing } from '@/i18n/routing'

import { Locale } from '@/types/common-types'

const baseUrl = 'https://splitify.me'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'UsefulLinksPage' })

  const canonicalUrl =
    locale === routing.defaultLocale ? `${baseUrl}/useful-links` : `${baseUrl}/${locale}/useful-links`

  const languages: Record<string, string> = {}
  routing.locales.forEach((loc) => {
    languages[loc] = loc === routing.defaultLocale ? `${baseUrl}/useful-links` : `${baseUrl}/${loc}/useful-links`
  })
  languages['x-default'] = `${baseUrl}/useful-links`

  return {
    title: t('Useful Links'),
    description: t('Here are some useful resources to help you navigate and make the most out of Splitify'),
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: `${t('Useful Links')} | Splitify`,
      description: t('Here are some useful resources to help you navigate and make the most out of Splitify'),
      url: canonicalUrl,
      siteName: 'Splitify',
      locale: locale,
      type: 'website',
    },
  }
}

export default async function UsefulLinksLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
