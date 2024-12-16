import { Locale } from '@/types/Common'
import { seoRoutes } from './seoRoutes'
import Description from './_components/Description'

const Page = async ({
  params,
}: Readonly<{
  params: Promise<{ locale: Locale; 'seo-route': string }>
}>) => {
  const awaitedParams = await params
  const localeSeoRoutes = seoRoutes[awaitedParams['locale']]

  return (
    <main className='w-full p-6 text-dark max-w-[600px]'>
      <h1 className='text-lg font-bold text-green-950'>
        {localeSeoRoutes[awaitedParams['seo-route'] as keyof typeof localeSeoRoutes]}
      </h1>
      <Description />
    </main>
  )
}

export default Page
