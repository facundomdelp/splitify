import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './_components/Layout/Header'
import Footer from './_components/Layout/Footer'
import { GoogleTagManager } from '@next/third-parties/google'
import LanguageProvider from '@/context/LanguageContext'
import Splash from '@/components/Splash'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })

export const metadata: Metadata = {
  title: 'Splitify',
  description: '🤑 Simplifica tus gastos en grupo con Splitify',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='h-full'>
      <GoogleTagManager gtmId='GTM-TSLLPXCB' />
      <body className={`${inter.className} antialiased bg-dark text-white relative min-h-full flex flex-col`}>
        <LanguageProvider>
          <Header />

          <div className='text-dark flex justify-center flex-1 w-full min-h-0'>{children}</div>

          <Footer />
        </LanguageProvider>

        <Splash />
      </body>
    </html>
  )
}
