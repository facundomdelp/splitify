import { Inter } from 'next/font/google'
import Header from './_components/Layout/Header'
import Footer from './_components/Layout/Footer'
import { GoogleTagManager } from '@next/third-parties/google'
import Splash from '@/components/Splash'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { Locale } from '@/types/Common'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: Locale }
}>) {
  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages()
  return (
    <html lang='en' className='h-full'>
      <GoogleTagManager gtmId='GTM-TSLLPXCB' />
      <body className={`${inter.className} antialiased bg-dark text-white relative min-h-full flex flex-col`}>
        <NextIntlClientProvider messages={messages}>
          <Header />

          <div className='text-dark flex justify-center flex-1 w-full min-h-0'>{children}</div>

          <Footer />

          <Splash />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
