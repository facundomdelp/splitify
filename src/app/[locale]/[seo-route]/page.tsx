'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { Locale } from '@/types/common.types'

import { Button } from '@/components/ui/button'

import { SEO_ROUTES } from '@/seo/seoRoutes'

const SeoPage = () => {
  const params = useParams<{ locale: Locale; 'seo-route': string }>()
  const localeSeoRoute = SEO_ROUTES[params.locale]

  const t = useTranslations('SeoPage')

  return (
    <main className='w-full p-10 text-dark max-w-[600px]'>
      <h1 className='text-lg font-bold text-green-950'>
        {localeSeoRoute[params['seo-route'] as keyof typeof localeSeoRoute]}
      </h1>
      <div className='flex flex-col gap-10'>
        <p className='text-gray-700 text-justify text-sm'>{t('paragraph-1')}</p>
        <Button className='w-full' asChild>
          <Link href='/'>{t('Get Started')}</Link>
        </Button>
        <p className='text-gray-700 text-justify text-sm'>{t('paragraph-2')}</p>
        <p className='text-gray-700 text-justify text-sm'>{t('paragraph-3')}</p>
        <p className='text-gray-700 text-justify text-sm'>{t('paragraph-4')}</p>
      </div>
    </main>
  )
}

export default SeoPage
