import { Inter } from 'next/font/google'
import Header from './_components/Layout/Header'
import Footer from './_components/Layout/Footer'
import { GoogleTagManager } from '@next/third-parties/google'
import Splash from '@/components/Splash'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { Locale } from '@/types/Common'
import { Metadata } from 'next'
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
      <body className={`${inter.className} antialiased bg-dark text-white relative min-h-full flex flex-col`}>
        <NextIntlClientProvider messages={messages}>
          <Header />

          <div className='text-green-950 flex justify-center flex-1 w-full min-h-0 mt-20'>{children}</div>

          <Footer />

          <Splash />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
