import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import './globals.css'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Splifify',
  description: 'Simplifica tus gastos en grupo con Splitify',
}

const MOBILE_BREAKPOINT = 600

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='h-full'>
      <body className={`${montserrat} antialiased bg-dark text-white relative min-h-full flex flex-col`}>
        <header className='w-full bg-green-500 flex justify-center items-center h-20 shadow-md rounded-b-sm'>
          <div className={`w-[${MOBILE_BREAKPOINT.toString()}px] flex justify-center items-center mt-2`}>
            <Image src='/Splitify.png' alt='Splitify' width={100} height={40} />
          </div>
        </header>
        <div className='text-dark flex justify-center flex-1'>
          <main className={`w-[${MOBILE_BREAKPOINT.toString()}px] text-gray-600 flex`}>{children}</main>
        </div>
        <footer className='w-full bg-green-950 flex justify-center items-center h-20'>
          <div className={`w-[${MOBILE_BREAKPOINT.toString()}px] flex justify-center items-center mt-1`}>
            <Image src='/Isologo.png' alt='Splitify' width={50} height={50} />
          </div>
        </footer>
      </body>
    </html>
  )
}
