import { useLocale } from 'next-intl'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Locale } from '@/types/common-types'

import { AVAILABLE_LOCALES } from '@/utils/constants/availableLocales'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const LocaleSelector = () => {
  const locale = useLocale() as Locale
  const router = useRouter()

  const setLocale = (newLocale: Locale) => {
    router.push(`/${newLocale}`)
  }

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

export default LocaleSelector
