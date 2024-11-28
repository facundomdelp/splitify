import { Translations } from '..'

const confirmation_modal = {
  Yes: {
    es: 'Si',
  },
  No: {
    es: 'No',
  },
} as const satisfies Translations

const copy_to_clipboard = {
  Copy: {
    es: 'Copiar',
  },
  'Pasted!': {
    es: '¡Copiado!',
  },
} as const satisfies Translations

const COMPONENTS_TRANSLATIONS = {
  ...confirmation_modal,
  ...copy_to_clipboard,
} as const satisfies Translations

export default COMPONENTS_TRANSLATIONS
