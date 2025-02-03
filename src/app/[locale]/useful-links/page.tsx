import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'

import { SEO_ROUTES } from '../[link]/constants'

const baseUrl = 'https://splitify.me'

const UsefulLinksPage = () => {
  const locale = useLocale()
  const t = useTranslations('UsefulLinksPage')

  return (
    <div className='w-full bg-green-50'>
      <section className='mx-auto w-full max-w-[600px] px-4 py-8'>
        <h1 className='text-2xl font-semibold text-green-900'>{t('Useful Links')}</h1>
        <p className='mb-8 mt-4 text-base text-gray-700'>
          {t('Here are some useful resources to help you navigate and make the most out of Splitify')}
        </p>

        <div className='grid grid-cols-1 gap-6'>
          <LinkCard
            key='faq'
            title='FAQ'
            description={t('Find answers to common questions and troubleshooting')}
            href={`${baseUrl}/${locale === 'en' ? '' : `${locale}/`}faq`}
          />

          {SEO_ROUTES[locale as keyof typeof SEO_ROUTES].map(({ slug, title, description }) => (
            <LinkCard
              key={slug}
              title={title}
              description={description}
              href={`${baseUrl}/${locale === 'en' ? '' : `${locale}/`}${slug}`}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

const LinkCard = ({ title, description, href }: { title: string; description: string; href: string }) => (
  <Link href={href}>
    <div className='rounded-lg bg-white p-6 shadow-lg transition-all hover:bg-green-100'>
      <h3 className='text-xl font-semibold text-green-700'>{title}</h3>
      <p className='mt-2 text-gray-600'>{description}</p>
    </div>
  </Link>
)

export default UsefulLinksPage
