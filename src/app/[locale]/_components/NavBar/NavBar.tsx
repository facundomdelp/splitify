'use client'

import { ForwardRefExoticComponent, ReactNode, RefAttributes, useState } from 'react'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

import { useSetGroups } from '@/store/groups.store'

import { useGetEmojiFromString } from '@/utils/hooks/useGetEmojiFromString'
import { usePWAInstall } from '@/utils/hooks/usePWAInstall'

import { useAddNewGroup, useHandleNavigation } from './hooks'

import { Globe, HandCoinsIcon, LucideProps, MenuIcon, RocketIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import LocaleSelectorModal from './LocaleSelectorModal'
import NavItem from './NavItem'
import NavSection from './NavSection'
import SocialMedia from './SocialMedia'

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

  const { handleNavigation } = useHandleNavigation({ setDrawerOpen })
  const { isInstallable, handleInstallClick } = usePWAInstall()

  const { addNewGroup, newGroupState } = useAddNewGroup({ setDrawerOpen })

  const getEmojiFromString = useGetEmojiFromString(true)

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
            'mr-12 h-full w-[400px] max-w-[90vw] overflow-y-auto overflow-x-hidden border-none text-black',
            direction === 'left' ? 'mr-auto rounded-tl-none' : 'ml-auto mr-0 rounded-tr-none',
          )}
          aria-describedby={undefined}
        >
          <header className='flex bg-green-700 p-8 pb-6'>
            <Image src='/Splitify.png' alt='Splitify' width={LOGO_WIDTH} height={LOGO_WIDTH / (10 / 3)} />
          </header>

          <main className='flex flex-1 flex-col gap-8 p-8'>
            <nav className='space-y-9'>
              <NavSection title={t('General')}>
                {isInstallable && (
                  <NavItem key='pwa' icon={RocketIcon} onClick={handleInstallClick} disabled={newGroupState.loading}>
                    {t('Install App')}
                  </NavItem>
                )}
                <NavItem
                  key='language'
                  icon={Globe}
                  onClick={() => setLocaleModalOpen(true)}
                  disabled={newGroupState.loading}
                >
                  {t('Language')}
                </NavItem>
              </NavSection>

              <NavSection title='Spliti'>
                {[
                  {
                    slug: 'spliti-quick',
                    emoji: '⚡',
                    name: `${t('Spliti Quick')}`,
                    href: `/`,
                  },
                ].map(({ slug, emoji, name, href }) => (
                  <NavItem
                    key={slug}
                    emoji={emoji}
                    href={href}
                    handleNavigation={handleNavigation}
                    disabled={newGroupState.loading}
                  >
                    {name}
                  </NavItem>
                ))}
              </NavSection>

              <NavSection title='Spliti Groups ✈️'>
                {[
                  {
                    slug: 'add-new-group',
                    icon: HandCoinsIcon,
                    name: `Add New Group`,
                    onClick: addNewGroup,
                    loading: newGroupState.loading,
                    strong: true,
                    beta: true,
                  },
                  ...(groups
                    ? groups.map(({ id, name }) => ({
                        slug: id,
                        emoji: getEmojiFromString(id),
                        name: name,
                        href: `/groups/${id}`,
                        beta: false,
                      }))
                    : []),
                ].map(({ slug, name, ...props }) => (
                  <NavItem key={slug} disabled={newGroupState.loading} {...props} handleNavigation={handleNavigation}>
                    {name}
                    {/* {beta && (
                      <Badge className='uppercase text-nowrap opacity-70 rounded-lg text-[9px] flex leading-3 px-2 pointer-events-none'>
                        Beta
                      </Badge>
                    )} */}
                  </NavItem>
                ))}
              </NavSection>
            </nav>
          </main>

          <footer className='mt-auto flex h-[118px] justify-end gap-3 p-8 text-gray-700'>
            <SocialMedia />
          </footer>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default NavBar
