import { Locale } from '@/types/Common'
import { seoRoutes } from './seoRoutes'
import { redirect } from 'next/navigation'

export default async function SeoRouteLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: Locale; 'seo-route': string }>
}>) {
  const awaitedParams = await params

  const isValidRoute = Object.keys(seoRoutes[awaitedParams.locale]).includes(awaitedParams['seo-route'])

  if (!isValidRoute) {
    redirect('/')
  }

  return children
}
