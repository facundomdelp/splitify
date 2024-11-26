'use client'

import React, { useState } from 'react'

interface LanguageProvider {
  language: 'es' | 'en'
  setLanguage: React.Dispatch<React.SetStateAction<LanguageProvider['language']>>
}

export const LanguageContext = React.createContext<LanguageProvider>({
  language: 'es',
  setLanguage: () => '',
})

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<LanguageProvider['language']>('es')

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}

export default LanguageProvider
