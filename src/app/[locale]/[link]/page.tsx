'use client'

import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'

import { Locale } from '@/types/common-types'

import { Button } from '@/components/ui/button'
import Spinner from '@/components/ui/spinner'

import { ArrowLeft, ArrowRight } from 'lucide-react'

import { useAddNewGroup } from '../groups/_hooks'
import { SEO_ROUTES, getSeoRoute } from './constants'

const SeoPage = () => {
  const { locale, link } = useParams<{ locale: Locale; link: string }>()

  const t = useTranslations('SeoPage')
  const tLinks = useTranslations('UsefulLinksPage')
  const activeLocale = useLocale()

  const { addNewGroup, newGroupState } = useAddNewGroup()

  const seoRoute = getSeoRoute(locale, link)

  if (!seoRoute) {
    notFound()
  }

  const { key, cta, title, description, firstParagraph, secondParagraph } = seoRoute

  const prefix = activeLocale === 'en' ? '' : `${activeLocale}/`
  const related = (SEO_ROUTES[activeLocale] ?? []).filter((route) => route.key !== key).slice(0, 3)

  return (
    <main className='bg-brand-surface flex w-full justify-center px-4 py-10'>
      <article className='flex w-full max-w-[620px] flex-col gap-8'>
        <Link
          href={`/${prefix}useful-links`}
          className='text-brand-muted group flex w-fit items-center gap-1 text-xs font-medium'
        >
          <ArrowLeft className='size-3.5 transition-transform group-hover:-translate-x-1' />
          {tLinks('Useful Links')}
        </Link>

        <header className='flex flex-col gap-3'>
          <h1 className='text-brand-text text-3xl leading-tight font-bold text-balance'>{title}</h1>
          <p className='text-muted-foreground text-base'>{description}</p>
        </header>

        <p className='text-foreground text-base leading-7'>{firstParagraph}</p>

        <div className='border-brand-border bg-card flex flex-col items-center gap-3 rounded-xl border p-5 text-center'>
          <p className='text-brand-text text-sm font-semibold'>
            {cta === 'groups' ? t('Create a group and share the link') : t('Try it now, it is free')}
          </p>

          {cta === 'groups' ? (
            <Button className='w-full' onClick={addNewGroup} disabled={newGroupState.loading}>
              {newGroupState.loading ? <Spinner /> : t('Create a Group')}
              {!newGroupState.loading && <ArrowRight className='size-4' />}
            </Button>
          ) : (
            <Button className='w-full' asChild>
              <Link href={`/${prefix}`}>
                {t('Get Started')}
                <ArrowRight className='size-4' />
              </Link>
            </Button>
          )}
        </div>

        <p className='text-foreground text-base leading-7'>{secondParagraph}</p>

        <Image className='mx-auto rounded-xl' src='/video-1.gif' alt={title} width={350} height={350} unoptimized />

        {!!related.length && (
          <section className='border-brand-border/40 flex flex-col gap-3 border-t pt-6'>
            <h2 className='text-brand-text text-sm font-semibold'>{t('Keep reading')}</h2>
            <ul className='flex flex-col gap-2'>
              {related.map((route) => (
                <li key={route.slug}>
                  <Link
                    href={`/${prefix}${route.slug}`}
                    className='group text-brand-muted flex items-center gap-2 text-sm underline-offset-4 hover:underline'
                  >
                    {route.title}
                    <ArrowRight className='size-3.5 shrink-0 transition-transform group-hover:translate-x-1' />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </main>
  )
}

export default SeoPage
