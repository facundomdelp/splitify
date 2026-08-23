'use client'

import { useMediaQuery } from 'usehooks-ts'

import { useState } from 'react'

import { useLocale } from 'next-intl'

import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { AVAILABLE_CURRENCIES, getCurrencyName, getCurrencySymbol } from '@/utils/constants/availableCurrencies'

import { Check } from 'lucide-react'

interface Props {
  currency?: string
  onSelect: (currency: string) => void
}

const CurrencySelector = ({ currency, onSelect }: Props) => {
  const locale = useLocale()
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const [open, setOpen] = useState(false)

  const setCurrency = onSelect

  const label = (code: string) => `${getCurrencySymbol(code, locale)} · ${getCurrencyName(code, locale)}`

  if (isDesktop) {
    return (
      <Select value={currency} onValueChange={setCurrency}>
        <SelectTrigger>
          <SelectValue placeholder='Currency' />
        </SelectTrigger>
        <SelectContent>
          {AVAILABLE_CURRENCIES.map((code) => (
            <SelectItem key={code} value={code}>
              {label(code)}
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
        {currency && <span>{label(currency)}</span>}
      </button>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className='text-foreground max-h-[85dvh] pb-6'>
          <DrawerHeader className='text-left'>
            <DrawerTitle>Currency</DrawerTitle>
            <DrawerDescription className='sr-only'>Select your preferred currency</DrawerDescription>
          </DrawerHeader>
          <div className='flex min-h-0 flex-1 flex-col overflow-y-auto px-4'>
            {AVAILABLE_CURRENCIES.map((code) => (
              <button
                key={code}
                onClick={() => {
                  setCurrency(code)
                  setOpen(false)
                }}
                className='hover:bg-accent flex items-center gap-3 rounded-md px-3 py-2.5 text-left'
              >
                <span className='w-8 shrink-0 text-sm font-semibold'>{getCurrencySymbol(code, locale)}</span>
                <span className='flex-1 text-sm'>{getCurrencyName(code, locale)}</span>
                {currency === code && <Check className='text-primary h-4 w-4' />}
              </button>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default CurrencySelector
