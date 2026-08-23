import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ArrowRight } from 'lucide-react'

import { SEO_ROUTES } from '../[link]/constants'

const UsefulLinksPage = () => {
  const locale = useLocale()
  const t = useTranslations('UsefulLinksPage')

  const notes = SEO_ROUTES[locale as keyof typeof SEO_ROUTES] ?? []

  if (!notes.length) {
    notFound()
  }

  return (
    <div className='bg-brand-surface w-full'>
      <section className='mx-auto w-full max-w-[600px] px-4 py-8'>
        <h1 className='text-brand-text text-2xl font-semibold'>{t('Useful Links')}</h1>
        <p className='text-foreground mt-4 mb-8 text-base'>
          {t('Here are some useful resources to help you navigate and make the most out of Splitify')}
        </p>

        <ul className='grid grid-cols-1 gap-4'>
          {notes.map(({ slug, title, description }) => (
            <li key={slug}>
              <LinkCard
                title={title}
                description={description}
                href={`/${locale === 'en' ? '' : `${locale}/`}${slug}`}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

const LinkCard = ({ title, description, href }: { title: string; description: string; href: string }) => (
  <Link
    href={href}
    className='group border-brand-border/40 bg-card hover:border-brand-border hover:bg-brand-surface-strong flex items-center gap-4 rounded-xl border p-5 transition-colors'
  >
    <span className='flex min-w-0 flex-col gap-1'>
      <span className='text-brand-muted font-semibold underline-offset-4 group-hover:underline'>{title}</span>
      <span className='text-muted-foreground text-sm'>{description}</span>
    </span>

    <ArrowRight className='text-brand ms-auto size-5 shrink-0 transition-transform group-hover:translate-x-1' />
  </Link>
)

export default UsefulLinksPage
