'use client'

import Link from 'next/link'
import { ForwardRefExoticComponent, ReactNode, RefAttributes, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { LucideProps, MenuIcon } from 'lucide-react'
import { Locale } from '@/types/Common'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import LocaleSelector from '@/components/LocaleSelector'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { usePWAInstall } from '@/lib/hooks/usePWAInstall'

const AVAILABLE_LOCALES: Array<{ locale: Locale; description: string; src: string }> = [
  { locale: 'en', description: 'English', src: '/en.jpg' },
  { locale: 'es', description: 'Español', src: '/es.jpg' },
  { locale: 'pt', description: 'Português', src: '/pt.jpg' },
]

const NavBar = ({
  opened = false,
  direction = 'right',
  className,
  icon: Icon = MenuIcon,
  logo,
  socialMedia,
}: {
  children?: ReactNode
  opened?: boolean
  direction?: 'right' | 'left'
  className?: string
  icon?: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
  logo: React.ReactNode
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

  const { isInstallable, handleInstallClick } = usePWAInstall()

  const t = useTranslations('NavBar')

  useEffect(() => {
    setDrawerOpen(opened)
  }, [opened])

  const locale = useLocale() as Locale
  const router = useRouter()

  const setLocale = (newLocale: Locale) => {
    router.push(`/${newLocale}`)
  }

  return (
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

            <LocaleSelector locale={locale} setLocale={setLocale} availableLocales={AVAILABLE_LOCALES} />
          </div>

          {/* <div>
            <h3>Settings</h3>
            <div className='flex items-center'>
              <Switch />
              <p>Categorize Expenses</p>
            </div>
          </div> */}

          <article className='flex-1 flex flex-col items-center justify-center gap-2 text-center text-gray-950 font-light px-2 leading-6'>
            <p>
              {t('🚀 Welcome to the')}
              <strong> {t('Splitify Beta')}</strong>!
              <br />
              {t('More things are coming 🤫')}
            </p>
            <p className='text-xs'>
              {t('Do you have any suggestions?')}
              <br />
              {t('Write to us on X (Twitter) or by Email!')}
            </p>
          </article>
        </main>

        {socialMedia && (
          <footer className='gap-4 flex justify-end text-gray-700 mt-auto p-8'>
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
