import { Translations } from '..'

const expenses_form = {
  'Add participant': {
    es: 'Añadir participante',
  },
} as const satisfies Translations

const expenses = {
  Participants: {
    es: 'Participantes',
  },
  'Enter a Participant to get started!': {
    es: '¡Ingresa un Participante para comenzar!',
  },
  'Calculate Balances': {
    es: ' Calcular Saldos',
  },
  Balances: {
    es: 'Saldos',
  },
} as const satisfies Translations

const transfers = {
  owes: {
    es: 'debe',
  },
  to: {
    es: 'a',
  },
} as const satisfies Translations

const clear_transfers = {
  'Are you sure you want to clear the transfer list?': {
    es: '¿Estas seguro que quieres limpiar el listado de transferencias?',
  },
  Clear: {
    es: 'Limpiar',
  },
} as const satisfies Translations

const remove_expenses = {
  'Are you sure you want to remove': {
    es: '¿Estas seguro de que quieres eliminar a',
  },
  'from the list?': {
    es: 'de la lista',
  },
} as const satisfies Translations

const APP_TRANSLATIONS = {
  ...expenses_form,
  ...expenses,
  ...transfers,
  ...clear_transfers,
  ...remove_expenses,
} as const satisfies Translations

export default APP_TRANSLATIONS
