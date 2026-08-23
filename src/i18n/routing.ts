import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'es', 'pt-BR', 'pt-PT', 'zh-CN', 'zh-TW', 'ar', 'fr', 'ja', 'ru', 'de', 'id'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: true,
  /* Group links are shared between people in different languages, so /groups/[id] stays untranslated */
  pathnames: {
    '/': '/',
    '/groups/[id]': '/groups/[id]',
    '/faq': {
      en: '/faq',
      es: '/preguntas-frecuentes',
      'pt-BR': '/perguntas-frequentes',
      'pt-PT': '/perguntas-frequentes',
      fr: '/questions-frequentes',
      de: '/haeufige-fragen',
      id: '/pertanyaan-umum',
      ru: '/chasto-zadavaemye-voprosy',
      ja: '/yoku-aru-shitsumon',
      'zh-CN': '/changjian-wenti',
      'zh-TW': '/changjian-wenti',
      ar: '/alasila-alshaia',
    },
    '/useful-links': {
      en: '/useful-links',
      es: '/enlaces-utiles',
      'pt-BR': '/links-uteis',
      'pt-PT': '/ligacoes-uteis',
      fr: '/liens-utiles',
      de: '/nuetzliche-links',
      id: '/tautan-berguna',
      ru: '/poleznye-ssylki',
      ja: '/benri-na-link',
      'zh-CN': '/shiyong-lianjie',
      'zh-TW': '/shiyong-lianjie',
      ar: '/rawabit-mufida',
    },
  },
})

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
