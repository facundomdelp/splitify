'use client'

import { Button } from '@/components/ui/button'
import { SEO_ROUTES } from '@/lib/seoRoutes'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

const SeoPage = () => {
  const params = useParams()
  const localeSeoRoute = SEO_ROUTES[params.locale as keyof typeof SEO_ROUTES]

  const t = useTranslations('SeoPage')

  return (
    <main className='w-full p-6 text-dark max-w-[600px]'>
      <h1 className='text-lg font-bold text-green-950'>
        {localeSeoRoute[params['seo-route'] as keyof typeof localeSeoRoute]}
      </h1>
      <div className='flex flex-col gap-6'>
        <p className='text-gray-700 text-justify text-sm'>{t('paragraph-1')}</p>
        <Button className='w-full' asChild>
          <Link href='/'>{t('Start')}</Link>
        </Button>
        <p className='text-gray-700 text-justify text-sm'>{t('paragraph-2')}</p>
        <p className='text-gray-700 text-justify text-sm'>{t('paragraph-3')}</p>
        <p className='text-gray-700 text-justify text-sm'>{t('paragraph-4')}</p>
      </div>
    </main>
  )
}

export default SeoPage
