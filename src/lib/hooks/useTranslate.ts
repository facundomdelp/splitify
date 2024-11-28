import { LanguageContext } from '@/context/LanguageContext'
import { Translations } from '@/types/Common'
import { useContext } from 'react'

export const useTranslate = <T extends Translations>(translations: T) => {
  const { language } = useContext(LanguageContext)

  return (key: keyof typeof translations) => {
    return translations[key][language as keyof T[keyof T]] || key
  }
}
