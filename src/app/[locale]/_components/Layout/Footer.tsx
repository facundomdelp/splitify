import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

import { Locale } from '@/types/common.types'

import { SEO_ROUTES } from '@/seo/seoRoutes'

const LOCALES: Locale[] = ['en', 'es', 'pt']
const ISOLOGO_SIZE = 65

const Footer = () => {
  const locale = useLocale() as Locale

  const t = useTranslations('Footer')

  return (
    <footer className='flex w-full flex-shrink-0 items-center justify-center bg-green-950 px-3 py-2'>
      <div className='relative mt-1 flex max-w-[600px] flex-1 items-center justify-center'>
        <Image src='/Isologo.png' alt='Splitify' width={ISOLOGO_SIZE} height={ISOLOGO_SIZE} />

        {/* SEO */}
        <nav className='absolute bottom-0 right-0 hidden'>
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
              <Link href={`/${locale}/groups`}>{t('Spliti Groups')}</Link>
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
