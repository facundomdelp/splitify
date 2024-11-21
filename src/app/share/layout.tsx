import { Metadata } from 'next'

export const metadata: Metadata = {
  manifest: null,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='h-full'>
      {children}
    </html>
  )
}
