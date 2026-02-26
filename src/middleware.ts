import createMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

export default createMiddleware({
  ...routing,
  localeDetection: true,
  // Custom locale matching for variants
  // When browser sends 'pt', prefer 'pt-BR', when 'zh', prefer 'zh-CN'
  localePrefix: 'as-needed',
})

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
