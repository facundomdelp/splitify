'use client'

import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

import { usePathname, useRouter } from '@/i18n/routing'

import { Locale } from '@/types/common-types'

import { cn } from '@/lib/utils'

import { AVAILABLE_LOCALES } from '@/utils/constants/availableLocales'

const ISOLOGO_SIZE = 65
const baseUrl = 'https://splitify.me'

const Footer = () => {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const setLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale })
  }

  const t = useTranslations('Footer')

  return (
    <footer className='flex w-full justify-center bg-green-950 py-2'>
      <div className='relative mt-1 flex max-w-[600px] flex-1 flex-col items-center justify-center bg-green-950 px-3'>
        <Image src='/Isologo.png' alt='Splitify' width={ISOLOGO_SIZE} height={ISOLOGO_SIZE} />

        <nav className='text-isologo flex w-full flex-col gap-3 bg-green-950 bg-opacity-90 px-3 py-1 text-xs xs:py-2 sm:py-4'>
          <ul className='flex justify-center'>
            <Li key='useful-links'>
              <Link className='hover:underline' href={`${baseUrl}/${locale === 'en' ? '' : `${locale}/`}useful-links`}>
                {t('Useful Links')}
              </Link>
            </Li>

            <Li key='faq'>
              <Link className='hover:underline' href={`${baseUrl}/${locale === 'en' ? '' : `${locale}/`}faq`}>
                FAQ
              </Link>
            </Li>

            {AVAILABLE_LOCALES?.map(({ locale, description }, index) => (
              <Li key={`${index}-${locale}`} onClick={() => setLocale(locale)}>
                <span className='cursor-pointer hover:underline'>{description}</span>
              </Li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}

const Li = (props: React.ComponentProps<'li'>) => {
  return (
    <li
      {...props}
      className={cn(
        'flex text-nowrap text-[8px] after:mx-2 after:content-["•"] last:after:hidden xs:after:mx-4 sm:text-xs sm:after:mx-8',
        props.className,
      )}
    >
      {props.children}
    </li>
  )
}

export default Footer
