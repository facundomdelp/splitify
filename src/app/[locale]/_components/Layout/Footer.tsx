'use client'

import { SEO_ROUTES } from '@/seo/seoRoutes'
import { Locale } from '@/types/common.types'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const LOCALES: Locale[] = ['en', 'es', 'pt']
const ISOLOGO_SIZE = 65

const Footer = () => {
  const { locale } = useParams<{ locale: Locale }>()

  const t = useTranslations('Footer')

  return (
    <footer className='w-full bg-green-950 flex justify-center items-center flex-shrink-0 py-2 px-3'>
      <div className='max-w-[600px] flex justify-center items-center mt-1 relative flex-1'>
        <Image src='/Isologo.png' alt='Splitify' width={ISOLOGO_SIZE} height={ISOLOGO_SIZE} />

        {/* SEO */}
        <nav className='absolute right-0 bottom-0'>
          <ul className='flex gap-2'>
            {LOCALES?.map((locale, index) => (
              <li key={`${index}-${locale}`}>
                <Link href={`./${locale}`}>
                  <Image
                    src={`/${locale}.jpg`}
                    alt={`${locale} page`}
                    width={16}
                    height={16}
                    className='rounded-full'
                  />
                </Link>
              </li>
            ))}
          </ul>

          <ul>
            <li>
              <Link href={`/${locale}/groups`}>{t('Groups')}</Link>
            </li>
          </ul>

          <ul className='flex gap-2'>
            {Object.entries(SEO_ROUTES[locale]).map(([route, name]) => {
              return (
                <li key={route}>
                  <Link href={`/${locale}/${route}`}>{name}</Link>
                </li>
              )
            })}
          </ul>
        </nav>
        {/* SEO */}
      </div>
    </footer>
  )
}

export default Footer
