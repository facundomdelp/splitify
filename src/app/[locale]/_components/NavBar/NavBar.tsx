'use client'

import { ForwardRefExoticComponent, ReactNode, RefAttributes, useState } from 'react'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { cn } from '@/lib/utils'

import Callout from '@/components/Callout'
import CurrencyModal from '@/components/CurrencyModal'
import ThemeModal from '@/components/ThemeModal'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

import { useSetGroups } from '@/store/groups-store'

import { useInitCurrency, useSetCurrency } from '@/utils/hooks/useCurrency'
import { useGetEmojiFromString } from '@/utils/hooks/useGetEmojiFromString'
import { usePWAInstall } from '@/utils/hooks/usePWAInstall'

import { Coins, Globe, HandCoinsIcon, LucideProps, MenuIcon, RocketIcon, SunMoon } from 'lucide-react'

import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import LocaleSelectorModal from './LocaleSelectorModal'
import NavItem from './NavItem'
import NavSection from './NavSection'
import SocialMedia from './SocialMedia'
import { useAddNewGroup, useHandleNavigation } from './hooks'

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
  const { groups } = useSetGroups()

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [localeModalOpen, setLocaleModalOpen] = useState(false)
  const [currencyModalOpen, setCurrencyModalOpen] = useState(false)
  const [themeModalOpen, setThemeModalOpen] = useState(false)

  useInitCurrency()
  const { currency, setCurrency } = useSetCurrency()

  const { handleNavigation } = useHandleNavigation({ setDrawerOpen })
  const { isInstallable, handleInstallClick } = usePWAInstall()

  const { addNewGroup, newGroupState } = useAddNewGroup({ setDrawerOpen })

  const getEmojiFromString = useGetEmojiFromString(true)

  const t = useTranslations('NavBar')

  return (
    <>
      <LocaleSelectorModal open={localeModalOpen} setOpen={setLocaleModalOpen} />
      <CurrencyModal
        open={currencyModalOpen}
        setOpen={setCurrencyModalOpen}
        currency={currency}
        onSelect={setCurrency}
      />
      <ThemeModal open={themeModalOpen} setOpen={setThemeModalOpen} />

      <Drawer direction={direction} open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerTrigger asChild className={className}>
          <Button variant='ghost' size='icon' aria-label='Open navigation menu' className='[&_svg]:size-8'>
            <Icon className='drop-shadow-lg' />
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
            'text-foreground me-12 h-full w-[400px] max-w-[90vw] overflow-x-hidden overflow-y-auto border-none',
            direction === 'left' ? 'me-auto rounded-tl-none' : 'ms-auto me-0 rounded-tr-none',
          )}
          aria-describedby={undefined}
        >
          <header className='bg-chrome flex p-8 pb-6'>
            <Image
              className='drop-shadow-lg'
              src='/Splitify.png'
              alt='Splitify'
              width={LOGO_WIDTH}
              height={LOGO_WIDTH / (10 / 3)}
            />
          </header>

          <main className='flex flex-1 flex-col gap-8 p-8'>
            {isInstallable && (
              <Callout
                icon={RocketIcon}
                title={t('Install App')}
                description={t('Add it to your home screen')}
                onClick={handleInstallClick}
                disabled={newGroupState.loading}
              />
            )}

            <nav className='space-y-9'>
              <NavSection title={t('Spliti Quick')}>
                <NavItem
                  key='spliti-quick'
                  emoji='⚡'
                  href='/'
                  handleNavigation={handleNavigation}
                  disabled={newGroupState.loading}
                >
                  {t('Spliti Quick')}
                </NavItem>
              </NavSection>

              <NavSection title={`${t('Spliti Groups')} ✈️`}>
                {[
                  {
                    slug: 'add-new-group',
                    icon: HandCoinsIcon,
                    name: t('Add New Group'),
                    onClick: addNewGroup,
                    loading: newGroupState.loading,
                    strong: true,
                  },
                  ...(groups
                    ? groups.map(({ id, name }) => ({
                        slug: id,
                        emoji: getEmojiFromString(id),
                        name: name,
                        href: { pathname: '/groups/[id]' as const, params: { id } },
                      }))
                    : []),
                ].map(({ slug, name, ...props }) => (
                  <NavItem key={slug} disabled={newGroupState.loading} {...props} handleNavigation={handleNavigation}>
                    {name}
                  </NavItem>
                ))}
              </NavSection>

              <NavSection title={t('Settings')}>
                <NavItem
                  key='language'
                  icon={Globe}
                  onClick={() => setLocaleModalOpen(true)}
                  disabled={newGroupState.loading}
                >
                  {t('Language')}
                </NavItem>
                <NavItem
                  key='currency'
                  icon={Coins}
                  onClick={() => setCurrencyModalOpen(true)}
                  disabled={newGroupState.loading}
                >
                  {t('Currency')}
                </NavItem>
                <NavItem
                  key='appearance'
                  icon={SunMoon}
                  onClick={() => setThemeModalOpen(true)}
                  disabled={newGroupState.loading}
                >
                  {t('Appearance')}
                </NavItem>
              </NavSection>
            </nav>
          </main>

          <footer className='text-foreground mt-auto flex h-[118px] justify-end gap-3 p-8'>
            <SocialMedia />
          </footer>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default NavBar
