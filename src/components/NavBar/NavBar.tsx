'use client'

import Link from 'next/link'
import { ForwardRefExoticComponent, ReactNode, RefAttributes, useCallback, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '../ui/drawer'
import { cn } from '@/lib/utils'
import { LucideProps, MenuIcon } from 'lucide-react'
import { Locale } from '@/types/Common'
import { useTranslations } from 'next-intl'
import LocaleSelector from '../LocaleSelector'
import { usePWAInstall } from '../../lib/hooks/usePWAInstall'

const NavBar = ({
  opened = false,
  links,
  direction = 'right',
  className,
  icon: Icon = MenuIcon,
  logo,
  locales,
  socialMedia,
}: {
  children?: ReactNode
  opened?: boolean
  links?: Array<Record<'text' | 'href', string>>
  direction?: 'right' | 'left'
  className?: string
  icon?: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
  logo: React.ReactNode
  locales?: {
    availableLocales: Array<{ locale: Locale; description: string; src: string }>
    locale: Locale
    setLocale: (newLocale: Locale) => void
  }
  socialMedia?: Array<{
    slug: string
    description?: string
    href: string
    icon:
      | ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
      | (({ className }: { className: string }) => JSX.Element)
  }>
}) => {
  const [drawerOpen, setDrawerOpen] = useState(opened)

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false)
  }, [])

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { hash } = new URL(e.currentTarget.href)

    if (hash) {
      e.preventDefault()

      setTimeout(() => {
        const targetElement = document.querySelector(hash)
        targetElement?.scrollIntoView({ behavior: 'smooth' })
      }, 400)
    }

    closeDrawer()
  }

  const t = useTranslations('NavBar')

  const { isInstallable, handleInstallClick } = usePWAInstall()

  useEffect(() => {
    setDrawerOpen(opened)
  }, [opened])

  return (
    <Drawer direction={direction} open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerTrigger asChild className={className}>
        <Button variant='ghost' size='icon' aria-label='Open navigation menu' className='[&_svg]:size-8'>
          <Icon />
        </Button>
      </DrawerTrigger>
      <DrawerTitle className='hidden' /> {/* For avoiding console error */}
      <DrawerContent
        className={cn(
          'overflow-y-auto text-black h-full mr-12 w-[400px] max-w-[90vw] overflow-x-hidden border-none',
          direction === 'left' ? 'mr-auto rounded-tl-none' : 'ml-auto mr-0 rounded-tr-none',
        )}
        aria-describedby={undefined}
      >
        <header className='flex p-8 pb-6 bg-green-700'>{logo}</header>

        <main className='p-8 flex flex-col gap-8 flex-1'>
          <div className='flex flex-col gap-4'>
            {isInstallable && (
              <Button
                onClick={handleInstallClick}
                variant='default'
                className='rounded-2xl drop-shadow-xl bg-green-500 relative overflow-hidden animate-beat delay-[5000ms]'
              >
                {t('Install App')}
                <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white opacity-10 animate-shine' />
              </Button>
            )}

            {locales && locales.availableLocales.length > 0 && <LocaleSelector {...locales} />}

            <a
              href='https://appgentina.com.ar/producto/splitify?ref=badge'
              title='Splitify | Appgentina'
              className='mx-auto'
              target='_blank'
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src='https://appgentina.com.ar/embed-svg/splitify'
                alt='Splitify | Appgentina'
                style={{ width: '229px', height: '54px' }}
                width='229'
                height='54'
              />
            </a>
          </div>

          <p className='flex-1 flex items-center justify-center text-center text-gray-950 font-light px-2 leading-6'>
            {t('Do you have any suggestions?')}
            <br />
            {t('Write to us on X (Twitter) or by Email!')}
          </p>

          <nav>
            <ul>
              {links?.map(({ text, href }, index) => (
                <li key={`${index}-${text}`} className='my-8 font-medium'>
                  <Link href={href} onClick={handleNavigation} className='hover:underline'>
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </main>

        {socialMedia && (
          <footer className='gap-4 flex justify-end text-gray-700 mt-auto p-8'>
            {socialMedia.map(({ slug, description, href, icon: Icon }) => (
              <Link
                key={`social-media-${slug}`}
                href={href}
                target='_blank'
                className='hover:text-bordeaux hover:underline transition-all flex items-center gap-1'
              >
                <Icon className='size-5' />
                {description && <p className='text-sm'>{description}</p>}
              </Link>
            ))}
          </footer>
        )}
      </DrawerContent>
    </Drawer>
  )
}

export default NavBar
