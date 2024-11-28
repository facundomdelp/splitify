import APP_TRANSLATIONS from './app'
import COMPONENTS_TRANSLATIONS from './components/components'

export type Translations = Record<string, Record<'es', string>>

export const TRANSLATIONS = {
  ...APP_TRANSLATIONS,
  ...COMPONENTS_TRANSLATIONS,
} as const satisfies Translations
