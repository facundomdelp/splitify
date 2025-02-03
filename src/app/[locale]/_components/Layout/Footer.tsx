'use client'

import { useMediaQuery } from 'usehooks-ts'

import { ReactNode, useEffect, useState } from 'react'

import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

import { AVAILABLE_LOCALES } from '@/utils/constants/availableLocales'

const ISOLOGO_SIZE = 65
const baseUrl = 'https://splitify.me'

const Footer = () => {
  const [isClient, setIsClient] = useState(false)

  const isDesktop = useMediaQuery('(min-width: 768px)')
  const locale = useLocale()
  const t = useTranslations('Footer')

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <footer className='flex w-full justify-center bg-green-950 py-2'>
      <div className='relative mt-1 flex max-w-[600px] flex-1 flex-col items-center justify-center gap-2 bg-green-950 px-3'>
        <Image src='/Isologo.png' alt='Splitify' width={ISOLOGO_SIZE} height={ISOLOGO_SIZE} />

        {isClient && isDesktop && (
          <nav className='flex w-full flex-col gap-3 bg-green-950 bg-opacity-90 px-3 py-3 text-xs'>
            <ul className='flex justify-center'>
              <Li key='useful-links'>
                <Link
                  className='hover:underline'
                  href={`${baseUrl}/${locale === 'en' ? '' : `${locale}/`}useful-links`}
                >
                  {t('Useful Links')}
                </Link>
              </Li>

              <Li key='faq'>
                <Link className='hover:underline' href={`${baseUrl}/${locale === 'en' ? '' : `${locale}/`}faq`}>
                  FAQ
                </Link>
              </Li>

              {AVAILABLE_LOCALES?.map(({ locale, description }, index) => (
                <Li key={`${index}-${locale}`}>
                  <Link className='flex gap-2 hover:underline' href={`${baseUrl}/${locale === 'en' ? '' : locale}`}>
                    {description}
                  </Link>
                </Li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </footer>
  )
}

const Li = ({ children }: { children: ReactNode }) => (
  <li className='flex text-nowrap after:mx-8 after:content-["•"] last:after:hidden'>{children}</li>
)

export default Footer
