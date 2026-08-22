'use client'

import { useMediaQuery } from 'usehooks-ts'

import { useState } from 'react'

import { useLocale } from 'next-intl'
import Image from 'next/image'

import { usePathname, useRouter } from '@/i18n/routing'

import { Locale } from '@/types/common-types'

import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { AVAILABLE_LOCALES } from '@/utils/constants/availableLocales'

import { Check } from 'lucide-react'

const LocaleSelector = () => {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const [open, setOpen] = useState(false)

  const setLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale })
    setOpen(false)
  }

  const currentLocale = AVAILABLE_LOCALES.find((l) => l.locale === locale)

  if (isDesktop) {
    return (
      <Select value={locale} onValueChange={(value: Exclude<Locale, undefined>) => setLocale(value)}>
        <SelectTrigger>
          <SelectValue placeholder='Language' />
        </SelectTrigger>
        <SelectContent>
          {AVAILABLE_LOCALES.map(({ locale, description, src }) => (
            <SelectItem key={locale} value={locale}>
              <div className='flex items-center gap-2'>
                <Image src={src} alt={description} width={16} height={16} className='rounded-full' />
                <p>{description}</p>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className='border-input flex h-9 w-full items-center gap-2 rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs'
      >
        {currentLocale && (
          <>
            <Image
              src={currentLocale.src}
              alt={currentLocale.description}
              width={16}
              height={16}
              className='rounded-full'
            />
            <span>{currentLocale.description}</span>
          </>
        )}
      </button>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className='pb-6 text-gray-700'>
          <DrawerHeader className='text-left'>
            <DrawerTitle>Language</DrawerTitle>
            <DrawerDescription className='sr-only'>Select your preferred language</DrawerDescription>
          </DrawerHeader>
          <div className='flex flex-col px-4'>
            {AVAILABLE_LOCALES.map(({ locale: loc, description, src }) => (
              <button
                key={loc}
                onClick={() => setLocale(loc as Locale)}
                className='hover:bg-accent flex items-center gap-3 rounded-md px-3 py-2.5 text-left'
              >
                <Image src={src} alt={description} width={20} height={20} className='rounded-full' />
                <span className='flex-1 text-sm'>{description}</span>
                {locale === loc && <Check className='text-primary h-4 w-4' />}
              </button>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default LocaleSelector
