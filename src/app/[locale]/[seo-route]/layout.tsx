import { SEO_ROUTES } from '@/seo/seoRoutes'
import { Locale } from '@/types/common.types'
import { redirect } from 'next/navigation'

export default async function SeoRouteLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: Locale; 'seo-route': string }>
}>) {
  const awaitedParams = await params

  const isValidRoute = Object.keys(SEO_ROUTES[awaitedParams.locale]).includes(awaitedParams['seo-route'])

  if (!isValidRoute) {
    redirect('/')
  }

  return children
}
