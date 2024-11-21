import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import './globals.css'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Splitify App',
  description: 'Simplifica tus gastos en grupo con Splitify',
}

const LOGO_WIDTH = 100
const ISOLOGO_SIZE = 40

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='h-full'>
      <body className={`${montserrat} antialiased bg-dark text-white relative min-h-full flex flex-col`}>
        <header className='w-full bg-green-500 flex justify-center items-center h-20 shadow-md rounded-b-sm'>
          <div className='w-[600px] flex justify-center items-center mt-2'>
            <Image src='/Splitify.png' alt='Splitify' width={LOGO_WIDTH} height={LOGO_WIDTH / (10 / 3)} />
          </div>
        </header>

        <div className='text-dark flex justify-center flex-1'>
          <main className='w-[600px] text-gray-600 flex'>{children}</main>
        </div>

        <footer className='w-full bg-green-950 flex justify-center items-center h-16'>
          <div className='w-[600px] flex justify-center items-center mt-1'>
            <Image src='/Isologo.png' alt='Splitify' width={ISOLOGO_SIZE} height={ISOLOGO_SIZE} />
          </div>
        </footer>
      </body>
    </html>
  )
}
