'use client'

import { SEO_ROUTES } from '@/app/[locale]/[seo-route]/constants'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { Locale } from '@/types/common-types'

import { Button } from '@/components/ui/button'

const SeoPage = () => {
  const params = useParams<{ locale: Locale; 'seo-route': string }>()
  const localeSeoRoute = SEO_ROUTES[params.locale]

  const t = useTranslations('SeoPage')

  return (
    <main className='text-dark w-full max-w-[600px] p-10'>
      <h1 className='text-lg font-bold text-green-950'>
        {localeSeoRoute[params['seo-route'] as keyof typeof localeSeoRoute]}
      </h1>
      <div className='flex flex-col gap-10'>
        <p className='text-justify text-sm text-gray-700'>{t('paragraph-1')}</p>
        <Button className='w-full' asChild>
          <Link href='/'>{t('Get Started')}</Link>
        </Button>
        <p className='text-justify text-sm text-gray-700'>{t('paragraph-2')}</p>
        <p className='text-justify text-sm text-gray-700'>{t('paragraph-3')}</p>
        <p className='text-justify text-sm text-gray-700'>{t('paragraph-4')}</p>
      </div>
    </main>
  )
}

export default SeoPage
