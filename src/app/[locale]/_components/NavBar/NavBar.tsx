'use client'

import { ForwardRefExoticComponent, ReactNode, RefAttributes, useState } from 'react'
import { cn } from '@/lib/utils'
import { CoinsIcon, Globe, HandCoinsIcon, LucideProps, MenuIcon, RocketIcon, Settings } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { usePWAInstall } from '@/lib/hooks/usePWAInstall'
import Image from 'next/image'
import LocaleSelectorModal from './LocaleSelectorModal'
import SocialMedia from './SocialMedia'
import NavSection from './NavSection'
import NavItem from './NavItem'
import { useHandleNavigation } from './hooks'
import { useParams } from 'next/navigation'

const LOGO_WIDTH = 120

const NavBar = ({
  direction = 'right',
  className,
  icon: Icon = MenuIcon,
}: {
  children?: ReactNode
  direction?: 'right' | 'left'
  className?: string
  icon?: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [localeModalOpen, setLocaleModalOpen] = useState(false)

  const { locale } = useParams()

  const { handleNavigation } = useHandleNavigation({ setDrawerOpen })
  const { isInstallable, handleInstallClick } = usePWAInstall()

  const t = useTranslations('NavBar')

  return (
    <>
      <LocaleSelectorModal open={localeModalOpen} setOpen={setLocaleModalOpen} />

      <Drawer direction={direction} open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerTrigger asChild className={className}>
          <Button variant='ghost' size='icon' aria-label='Open navigation menu' className='[&_svg]:size-8'>
            <Icon />
          </Button>
        </DrawerTrigger>
        <VisuallyHidden>
          <DrawerHeader>
            <DrawerTitle>{t('Discover more!')}</DrawerTitle>
            <DrawerDescription />
          </DrawerHeader>
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
              <NavSection title={t('General')}>
                {isInstallable && (
                  <NavItem key='pwa' icon={RocketIcon} onClick={handleInstallClick}>
                    {t('Install App')}
                  </NavItem>
                )}
                <NavItem key='language' icon={Globe} onClick={() => setLocaleModalOpen(true)}>
                  {t('Language')}
                </NavItem>
                <NavItem key='settings' icon={Settings} disabled>
                  {t('Settings')} 🏭
                </NavItem>
              </NavSection>

              <NavSection title='Spliti'>
                {[
                  {
                    slug: 'spliti-basic',
                    icon: CoinsIcon,
                    name: `${t('Spliti Quick')} ⚡`,
                    href: `/${locale}`,
                    disabled: undefined,
                  },
                  {
                    slug: 'spliti-groups',
                    icon: HandCoinsIcon,
                    name: `${t('Spliti Groups')} ✈️`,
                    href: `/${locale}/groups`,
                    disabled: undefined,
                  },
                ].map(({ slug, icon, name, href, disabled }) => (
                  <NavItem key={slug} icon={icon} disabled={disabled} href={href} handleNavigation={handleNavigation}>
                    {name}
                  </NavItem>
                ))}
              </NavSection>
            </nav>
          </main>

          <footer className='gap-3 flex justify-end text-gray-700 mt-auto p-8 h-[118px]'>
            <SocialMedia />
          </footer>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default NavBar
