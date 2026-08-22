'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { Link } from '@/i18n/routing'

import TiktokLogo from '@/components/icons/TiktokLogo'
import XLogo from '@/components/icons/XLogo'

import { MailIcon } from 'lucide-react'

const LOGO_WIDTH = 130
const LINK_CLASS = 'text-xs text-green-200/80 transition-colors hover:text-white'

const SOCIALS = [
  { key: 'x', href: 'https://x.com/splitify_me', label: 'X', icon: XLogo },
  { key: 'tiktok', href: 'https://www.tiktok.com/@.splitify', label: 'TikTok', icon: TiktokLogo },
  { key: 'mail', href: 'mailto:splitify.me@gmail.com', label: 'Email', icon: MailIcon },
] as const

const Footer = () => {
  const t = useTranslations('Footer')

  return (
    <footer className='w-full bg-green-950 text-green-200'>
      <div className='mx-auto flex w-full max-w-[600px] flex-col px-6 py-10'>
        <div className='flex flex-col gap-8 sm:flex-row sm:justify-between'>
          <div className='max-w-[260px]'>
            <Image
              className='drop-shadow-lg'
              src='/Splitify.png'
              alt='Splitify'
              width={LOGO_WIDTH}
              height={LOGO_WIDTH / (10 / 3)}
            />
            <p className='mt-3 text-xs leading-5 text-green-200/70'>{t('Split group expenses with friends')}</p>
          </div>

          <nav aria-labelledby='footer-resources'>
            <h2 id='footer-resources' className='text-xs font-semibold uppercase tracking-wider text-white'>
              {t('Resources')}
            </h2>
            <ul className='mt-3 flex flex-col gap-2'>
              <li>
                <Link className={LINK_CLASS} href='/faq'>
                  FAQ
                </Link>
              </li>
              <li>
                <Link className={LINK_CLASS} href='/useful-links'>
                  {t('Useful Links')}
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-labelledby='footer-follow'>
            <h2 id='footer-follow' className='text-xs font-semibold uppercase tracking-wider text-white'>
              {t('Follow us')}
            </h2>
            <ul className='mt-3 flex gap-4'>
              {SOCIALS.map(({ key, href, label, icon: Icon }) => (
                <li key={key}>
                  <a
                    href={href}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={label}
                    className='block text-green-200/80 transition-colors hover:text-white'
                  >
                    <Icon className='size-5' />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className='mt-8 flex flex-col items-center gap-1 border-t border-green-200/15 pt-5 text-[11px] text-green-200/60 sm:flex-row sm:justify-between'>
          <p>© {new Date().getFullYear()} Splitify</p>
          <p>{t('All rights reserved')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
