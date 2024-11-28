'use client'

import { TRANSLATIONS } from '@/translations'
import { createContext, useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'

interface LanguageProvider {
  language: 'es' | 'en'
  setLanguage: React.Dispatch<React.SetStateAction<LanguageProvider['language']>>
  t: (key: keyof typeof TRANSLATIONS, variables?: { [variable: string]: string }) => string
}

export const LanguageContext = createContext<LanguageProvider>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
})

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useLocalStorage<LanguageProvider['language']>('language', 'en', {
    initializeWithValue: false,
  })

  useEffect(() => {
    const localStorageLanguage = window.localStorage.getItem('language')

    if (!localStorageLanguage) {
      const browserLang = navigator.language.split('-')[0]
      setLanguage((['en', 'es'].includes(browserLang) ? browserLang : 'en') as LanguageProvider['language'])
    }
  }, [language, setLanguage])

  const t = (key: keyof typeof TRANSLATIONS, variables: { [variable: string]: string } = {}) => {
    const text = TRANSLATIONS[key][language as Exclude<LanguageProvider['language'], 'en'>] || key

    return text.replace(/\{\{(\w+)\}\}/g, (_, variable: string) => variables[variable] || '')
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export default LanguageProvider
