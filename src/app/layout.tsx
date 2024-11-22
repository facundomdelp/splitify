import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Header from './_components/Header'
import Footer from './_components/Footer'
import './globals.css'
import { GoogleTagManager } from '@next/third-parties/google'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Splitify App',
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
      <body className={`${montserrat} antialiased bg-dark text-white relative min-h-full flex flex-col`}>
        <Header />

        <div className='text-dark flex justify-center flex-1 w-full min-h-0'>{children}</div>

        <Footer />
      </body>
    </html>
  )
}
