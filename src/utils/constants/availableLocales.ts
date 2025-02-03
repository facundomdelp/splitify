import { Locale } from '@/types/common-types'

export const AVAILABLE_LOCALES: Array<{ locale: Locale; description: string; src: string }> = [
  { locale: 'en', description: 'English', src: '/en.jpg' },
  { locale: 'es', description: 'Español', src: '/es.jpg' },
  { locale: 'pt', description: 'Português', src: '/pt.jpg' },
]
