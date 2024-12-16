'use client'

import Description from './_components/Description'
import { SEO_ROUTES } from '@/lib/seoRoutes'
import { useParams } from 'next/navigation'

const Page = () => {
  const params = useParams()
  const localeSeoRoute = SEO_ROUTES[params.locale as keyof typeof SEO_ROUTES]

  return (
    <main className='w-full p-6 text-dark max-w-[600px]'>
      <h1 className='text-lg font-bold text-green-950'>
        {localeSeoRoute[params['seo-route'] as keyof typeof localeSeoRoute]}
      </h1>
      <Description />
    </main>
  )
}

export default Page
