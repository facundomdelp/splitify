'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'

import { Locale } from '@/types/common-types'

import { Button } from '@/components/ui/button'

import { SEO_ROUTES } from './constants'

const SeoPage = () => {
  const { locale, link } = useParams<{ locale: Locale; link: string }>()
  const localeSeoRoutes = SEO_ROUTES[locale as keyof typeof SEO_ROUTES] ?? []

  const t = useTranslations('SeoPage')

  const seoRoute = localeSeoRoutes.find((route) => route.slug === link)

  if (!seoRoute) {
    notFound()
  }

  const { title, firstParagraph, secondParagraph } = seoRoute

  return (
    <main className='flex w-full justify-center bg-green-50 p-10'>
      <section className='max-w-[600px]'>
        <h1 className='text-lg font-bold text-green-950'>{title}</h1>
        <div className='flex flex-col gap-10'>
          <p className='text-justify text-sm leading-6 text-gray-700'>🤑 {firstParagraph}</p>

          <Button className='animate-beat w-full' asChild>
            <Link href='/'>{t('Get Started')}</Link>
          </Button>

          <p className='text-justify text-sm leading-6 text-gray-700'>💸 {secondParagraph}</p>

          <div className='flex justify-center'>
            <Image src='/video-1.gif' alt='Bill split example' width={350} height={350} />
          </div>
        </div>
      </section>
    </main>
  )
}

export default SeoPage
