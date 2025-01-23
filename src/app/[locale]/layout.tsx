import { GoogleTagManager } from '@next/third-parties/google'
import { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'

import { routing } from '@/i18n/routing'

import { Locale } from '@/types/common.types'

import Footer from './_components/Layout/Footer'
import Header from './_components/Layout/Header'
import Splash from '@/components/Splash'

import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = 'https://splitify.me'
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  const languages: Record<string, string> = {}
  routing.locales.forEach((loc) => {
    languages[loc] = `${baseUrl}/${loc}`
  })
  languages['x-default'] = `${baseUrl}/en`

  const canonicalUrl = `${baseUrl}/${locale}`

  return {
    title: {
      template: `%s | Splitify`,
      default: t('title'),
    },
    description: t('description'),
    keywords: t('keywords'),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: canonicalUrl,
      siteName: 'Splitify',
      locale: locale,
      type: 'website',
      alternateLocale: routing.locales.filter((loc) => loc !== locale),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
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

  return (
    <html lang={locale} className='h-full'>
      <GoogleTagManager gtmId='GTM-TSLLPXCB' />
      <body
        className={`${inter.className} bg-dark relative flex min-h-full flex-col overflow-auto text-white antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />

          <div className='mt-20 flex min-h-0 w-full flex-1 justify-center text-green-950'>{children}</div>

          <Footer />

          <Splash />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
