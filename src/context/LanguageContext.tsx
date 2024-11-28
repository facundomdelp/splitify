'use client'

import { Language } from '@/types/Common'
import { createContext, useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'

interface LanguageProvider {
  language: Language
  setLanguage: React.Dispatch<React.SetStateAction<Language>>
}

export const LanguageContext = createContext<LanguageProvider>({
  language: 'en',
  setLanguage: () => {},
})

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useLocalStorage<Language>('language', 'en', {
    initializeWithValue: false,
  })

  useEffect(() => {
    const localStorageLanguage = window.localStorage.getItem('language')

    if (!localStorageLanguage) {
      const browserLang = navigator.language.split('-')[0] as Language
      setLanguage(['en', 'es'].includes(browserLang) ? browserLang : 'en')
    }
  }, [language, setLanguage])

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}

export default LanguageProvider
