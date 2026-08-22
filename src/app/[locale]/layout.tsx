import { GoogleTagManager } from '@next/third-parties/google'
import { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'

import { routing } from '@/i18n/routing'

import { Locale } from '@/types/common-types'

import Footer from './_components/Layout/Footer'
import Header from './_components/Layout/Header'
import Splash from '@/components/Splash'

import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })

export const viewport: Viewport = {
  themeColor: '#22C55E',
  colorScheme: 'light',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = 'https://splitify.me'
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  const languages: Record<Locale, string> = {} as Record<Locale, string>
  routing.locales.forEach((loc) => {
    languages[loc] = loc === routing.defaultLocale ? `${baseUrl}/` : `${baseUrl}/${loc}`
  })

  const canonicalUrl = locale === routing.defaultLocale ? `${baseUrl}/` : `${baseUrl}/${locale}`

  return {
    title: {
      template: `%s | Splitify`,
      default: t('title'),
    },
    description: t('description'),
    keywords: t('keywords'),
    metadataBase: new URL(baseUrl),
    applicationName: 'Splitify',
    authors: [{ name: 'Splitify' }],
    creator: 'Splitify',
    formatDetection: {
      telephone: false,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ...languages,
        'x-default': `${baseUrl}/`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
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
          alt: 'Splitify - Simplify your group expenses',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`${baseUrl}/Splitify-banner.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/splitify-192x192.png',
      apple: '/apple-touch-icon.png',
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}>) {
  const { locale } = await params
  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages()

  const baseUrl = 'https://splitify.me'
  const canonicalUrl = locale === routing.defaultLocale ? `${baseUrl}/` : `${baseUrl}/${locale}`

  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Splitify',
    url: canonicalUrl,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Simplify your group expenses with Splitify. Add participants, calculate balances, and share costs fairly.',
    image: `${baseUrl}/Splitify-banner.jpg`,
    inLanguage: locale,
    isAccessibleForFree: true,
    browserRequirements: 'Requires JavaScript',
    featureList: [
      'Split a bill between friends in seconds',
      'Share an expense with only some of the group',
      'Settle up with the fewest transfers possible',
      'Collaborative groups you can share with a link',
      'Works without creating an account',
    ],
    screenshot: `${baseUrl}/SplitiQuick-en.png`,
  }

  const webSiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Splitify',
    alternateName: ['Splitify me', 'Splitify app', 'splitify.me'],
    url: baseUrl,
    inLanguage: locale,
    publisher: { '@type': 'Organization', name: 'Splitify', url: baseUrl },
  }

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Splitify',
    url: baseUrl,
    logo: `${baseUrl}/splitify-512x512.png`,
    email: 'splitify.me@gmail.com',
    sameAs: ['https://x.com/splitify_me', 'https://www.tiktok.com/@.splitify'],
  }

  return (
    <html lang={locale} className='h-full'>
      <head>
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }} />
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      </head>
      <GoogleTagManager gtmId='GTM-TSLLPXCB' />
      <body
        className={`${inter.className} bg-dark relative flex min-h-screen flex-col overflow-auto text-white antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />

          <div className='mt-20 flex min-h-[calc(100vh-5rem)] w-full flex-1 justify-center text-slate-600'>
            {children}
          </div>

          <Footer />

          <Splash />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
