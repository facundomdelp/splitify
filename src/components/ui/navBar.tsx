'use client'

import Link from 'next/link'
import { ForwardRefExoticComponent, ReactNode, RefAttributes, useCallback, useEffect, useState } from 'react'
import { Button } from './button'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from './drawer'
import { cn } from '@/lib/utils'
import { LucideProps, MenuIcon } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import Image from 'next/image'
import LanguageProvider from '@/context/LanguageContext'

export const NavBar = ({
  opened = false,
  links,
  direction = 'right',
  className,
  icon: Icon = MenuIcon,
  logo,
  language,
  socialMedia,
}: {
  children?: ReactNode
  opened?: boolean
  links?: Array<Record<'text' | 'href', string>>
  direction?: 'right' | 'left'
  className?: string
  icon?: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
  logo: React.ReactNode
  language?: {
    languages: Array<{ slug: Exclude<LanguageProvider['language'], undefined>; language: string; src: string }>
    language: LanguageProvider['language']
    setLanguage: LanguageProvider['setLanguage']
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
          'overflow-y-auto text-black h-full mr-12 max-w-[350px] overflow-x-hidden border-none',
          direction === 'left' ? 'mr-auto rounded-tl-none' : 'ml-auto mr-0 rounded-tr-none',
        )}
      >
        <header className='flex p-8 pb-6 bg-green-700'>{logo}</header>

        <main className='p-8 flex flex-col gap-8 flex-1'>
          {language && language.languages.length > 0 && (
            <Select
              value={language.language}
              onValueChange={(value: Exclude<LanguageProvider['language'], undefined>) => language.setLanguage(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder='Language' />
              </SelectTrigger>
              <SelectContent>
                {language.languages.map(({ slug, language, src }) => (
                  <SelectItem key={slug} value={slug}>
                    <div className='flex items-center gap-2'>
                      <Image src={src} alt={language} width={16} height={16} className='rounded-full' />
                      <p>{language}</p>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* TODO: REMOVE */}
          <p className='flex-1 flex items-center text-center text-gray-950 font-light px-2 leading-6'>
            {language?.language === 'es' ? '¿Tenes alguna propuesta?' : 'Do you have any suggestions?'}
            <br />
            {language?.language === 'es'
              ? '¡Escribinos por X (Twitter) o por Email!'
              : 'Write to us on X (Twitter) or by Email!'}
          </p>
          {/* TODO: REMOVE */}

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
