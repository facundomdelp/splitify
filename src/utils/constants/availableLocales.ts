import { Locale } from '@/types/common-types'

export const AVAILABLE_LOCALES: Array<{ locale: Locale; description: string; src: string }> = [
  { locale: 'en', description: 'English', src: '/gb.svg' },
  { locale: 'es', description: 'Español', src: '/es.svg' },
  { locale: 'pt-BR', description: 'Português (Brasil)', src: '/br.svg' },
  { locale: 'pt-PT', description: 'Português (Portugal)', src: '/pt.svg' },
  { locale: 'zh-CN', description: '简体中文', src: '/cn.svg' },
  { locale: 'zh-TW', description: '繁體中文', src: '/tw.svg' },
  { locale: 'ar', description: 'العربية', src: '/sa.svg' },
  { locale: 'fr', description: 'Français', src: '/fr.svg' },
  { locale: 'ja', description: '日本語', src: '/jp.svg' },
  { locale: 'ru', description: 'Русский', src: '/ru.svg' },
  { locale: 'de', description: 'Deutsch', src: '/de.svg' },
  { locale: 'id', description: 'Bahasa Indonesia', src: '/id.svg' },
]
