'use client'

import Link from 'next/link'
import { ForwardRefExoticComponent, ReactNode, RefAttributes, useEffect, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  ChevronRight,
  CoinsIcon,
  FlagIcon,
  HandCoinsIcon,
  LucideProps,
  MailIcon,
  MenuIcon,
  RocketIcon,
  Settings,
} from 'lucide-react'
// import { Locale } from '@/types/Common'
import { /* useLocale,  */ useTranslations } from 'next-intl'
// import { useRouter } from 'next/navigation'
// import LocaleSelector from '@/components/LocaleSelector'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { usePWAInstall } from '@/lib/hooks/usePWAInstall'
import { useGetGeoLocation } from '@/lib/hooks/useGetGeoLocation'
import { COUNTRIES } from '@/lib/constants/countries'
import XLogo from '@/components/icons/XLogo'
import TiktokLogo from '@/components/icons/TiktokLogo'
import Image from 'next/image'
import { slugify } from '@/lib/functions/slugify'

const LOGO_WIDTH = 120

// const AVAILABLE_LOCALES: Array<{ locale: Locale; description: string; src: string }> = [
//   { locale: 'en', description: 'English', src: '/en.jpg' },
//   { locale: 'es', description: 'Español', src: '/es.jpg' },
//   { locale: 'pt', description: 'Português', src: '/pt.jpg' },
// ]

const NavBar = ({
  opened = false,
  direction = 'right',
  className,
  icon: Icon = MenuIcon,
}: {
  children?: ReactNode
  opened?: boolean
  direction?: 'right' | 'left'
  className?: string
  icon?: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
}) => {
  const [drawerOpen, setDrawerOpen] = useState(opened)

  const { isInstallable, handleInstallClick } = usePWAInstall()
  const userGeoLocation = useGetGeoLocation()

  const t = useTranslations('NavBar')

  useEffect(() => {
    setDrawerOpen(opened)
  }, [opened])

  // const locale = useLocale() as Locale
  // const router = useRouter()

  // const setLocale = (newLocale: Locale) => {
  //   router.push(`/${newLocale}`)
  // }

  return (
    <>
      <Drawer direction={direction} open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerTrigger asChild className={className}>
          <Button variant='ghost' size='icon' aria-label='Open navigation menu' className='[&_svg]:size-8'>
            <Icon />
          </Button>
        </DrawerTrigger>
        <VisuallyHidden>
          <DrawerTitle aria-hidden='false' inert>
            {t('Discover more!')}
          </DrawerTitle>
        </VisuallyHidden>
        <DrawerContent
          className={cn(
            'overflow-y-auto text-black h-full mr-12 w-[400px] max-w-[90vw] overflow-x-hidden border-none',
            direction === 'left' ? 'mr-auto rounded-tl-none' : 'ml-auto mr-0 rounded-tr-none',
          )}
          aria-describedby={undefined}
        >
          <header className='flex p-8 pb-6 bg-green-700'>
            <Image src='/Splitify.png' alt='Splitify' width={LOGO_WIDTH} height={LOGO_WIDTH / (10 / 3)} />
          </header>

          <main className='p-8 flex flex-col gap-8 flex-1'>
            <nav className='space-y-9'>
              <NavSection title='General'>
                {isInstallable && (
                  <NavItem key='pwa' icon={RocketIcon} onClick={handleInstallClick}>
                    {t('Install App')}
                  </NavItem>
                )}
                <NavItem key='language' icon={FlagIcon}>
                  Idioma
                </NavItem>
                <NavItem key='settings' icon={Settings} disabled>
                  Configuraciones 🏭
                </NavItem>
              </NavSection>

              <NavSection title='Spliti'>
                {[
                  { slug: 'spliti-basic', icon: CoinsIcon, name: 'Spliti Basic', href: '/' },
                  { slug: 'spliti-groups', icon: HandCoinsIcon, name: 'Spliti Groups 🏭', href: '/', disabled: true },
                ].map(({ slug, icon, name, href, disabled }) => (
                  <NavItem key={slug} icon={icon} disabled={disabled} href={href}>
                    {name}
                  </NavItem>
                ))}
              </NavSection>
            </nav>
          </main>

          <footer className='gap-3 flex justify-end text-gray-700 mt-auto p-8'>
            {userGeoLocation?.country === COUNTRIES.argentina && (
              <a
                href='https://appgentina.com.ar/producto/splitify?ref=badge'
                title='Splitify | Appgentina'
                className='mr-auto max-w-[200px] pr-2'
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
            )}

            {[
              {
                slug: 'x',
                href: 'https://x.com/splitify_me',
                icon: XLogo,
              },
              {
                slug: 'tik-tok',
                href: 'https://www.tiktok.com/@.splitify',
                icon: TiktokLogo,
              },
              {
                slug: 'mail',
                href: 'mailto:splitify.me@gmail.com',
                icon: MailIcon,
              },
            ].map(({ slug, href, icon: Icon }) => (
              <Link
                key={`social-media-${slug}`}
                href={href}
                target='_blank'
                className='hover:text-bordeaux hover:underline transition-all flex items-center gap-1'
              >
                <Icon className='size-5' />
              </Link>
            ))}
          </footer>
        </DrawerContent>
      </Drawer>
    </>
  )
}

interface NavSectionProps {
  title: string
  children: ReactNode
}

const NavSection = ({ title, children }: NavSectionProps) => {
  const titleId = useMemo(() => `title-${slugify(title)}`, [title])

  return (
    <section aria-labelledby={titleId}>
      <h2 id={titleId} className='font-bold text-gray-700 pb-2'>
        {title}
      </h2>
      <ul className='flex flex-col'>{children}</ul>
    </section>
  )
}

interface NavItemProps {
  children: ReactNode
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
  href?: string
  onClick?: () => void
  disabled?: boolean
}

const NavItem = ({ children, icon: Icon, href, onClick, disabled }: NavItemProps) => {
  const NavChildren = () => (
    <>
      <Icon className={cn('text-green-700 size-[20px]', disabled ? 'text-gray-400 cursor-not-allowed' : '')} />
      {children}
      <ChevronRight className='ml-auto size-[20px]' />
    </>
  )

  return (
    <li className={cn('text-gray-600 py-3 border-b text-sm', disabled ? 'text-gray-400' : '')}>
      {href ? (
        <Link href={href} className='flex flex-nowrap gap-4 items-center'>
          <NavChildren />
        </Link>
      ) : (
        <Button
          variant='ghost'
          className='flex flex-nowrap gap-4 items-center p-0 w-full font-normal hover:bg-inherit hover:text-inherit h-fit [&_svg]:size-[20px]'
          onClick={onClick}
        >
          <NavChildren />
        </Button>
      )}
    </li>
  )
}

export default NavBar
