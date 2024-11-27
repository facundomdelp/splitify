'use client'

import { useLocalStorage } from '@/lib/hooks/useLocalStorage'
import { TRANSLATIONS } from '@/translations'
import React from 'react'

interface LanguageProvider {
  language?: 'es' | 'en'
  setLanguage: React.Dispatch<React.SetStateAction<'es' | 'en' | undefined>>
  t: (key: keyof typeof TRANSLATIONS, variables?: { [variable: string]: string }) => string
}

export const LanguageContext = React.createContext<LanguageProvider>({
  language: undefined,
  setLanguage: () => {},
  t: () => '',
})

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useLocalStorage<LanguageProvider['language']>('language', 'en')

  const t = (key: keyof typeof TRANSLATIONS, variables: { [variable: string]: string } = {}) => {
    const text = TRANSLATIONS[key][language as 'es'] || key

    return text.replace(/\{\{(\w+)\}\}/g, (_, variable: string) => variables[variable] || '')
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export default LanguageProvider
