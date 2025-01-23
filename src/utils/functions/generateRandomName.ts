import { Locale } from '@/types/common.types'

import { ADJECTIVES, NOUNS } from '../constants/names'

export const generateRandomName = (locale?: Locale) => {
  locale = locale || 'en'

  const adjective = ADJECTIVES[locale]
  const nouns = NOUNS[locale]

  const randomAdjective = adjective[Math.floor(Math.random() * adjective.length)]
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]

  if (locale === 'en') return `${randomAdjective} ${randomNoun}`
  return `${randomNoun} ${randomAdjective}`
}
