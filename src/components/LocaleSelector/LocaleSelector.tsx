import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import Image from 'next/image'
import { Locale } from '@/types/Common'

interface Props {
  locale: Locale
  setLocale: (newLocale: Locale) => void
  availableLocales: Array<{ locale: Locale; description: string; src: string }>
}

const LocaleSelector = ({ locale, setLocale, availableLocales }: Props) => {
  return (
    <Select value={locale} onValueChange={(value: Exclude<Locale, undefined>) => setLocale(value)}>
      <SelectTrigger>
        <SelectValue placeholder='Language' />
      </SelectTrigger>
      <SelectContent>
        {availableLocales.map(({ locale, description, src }) => (
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

export default LocaleSelector
