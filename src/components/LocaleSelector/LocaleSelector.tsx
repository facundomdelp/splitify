'use client'

import { useMediaQuery } from 'usehooks-ts'

import { useState } from 'react'

import { useLocale } from 'next-intl'

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
          {AVAILABLE_LOCALES.map(({ locale, description }) => (
            <SelectItem key={locale} value={locale}>
              {description}
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
        {currentLocale && <span>{currentLocale.description}</span>}
      </button>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className='text-foreground pb-6'>
          <DrawerHeader className='text-left'>
            <DrawerTitle>Language</DrawerTitle>
            <DrawerDescription className='sr-only'>Select your preferred language</DrawerDescription>
          </DrawerHeader>
          <div className='flex flex-col px-4'>
            {AVAILABLE_LOCALES.map(({ locale: loc, description }) => (
              <button
                key={loc}
                onClick={() => setLocale(loc as Locale)}
                className='hover:bg-accent flex items-center gap-3 rounded-md px-3 py-2.5 text-left'
              >
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
