export const AVAILABLE_CURRENCIES = [
  'USD',
  'EUR',
  'GBP',
  'ARS',
  'BRL',
  'MXN',
  'CLP',
  'COP',
  'PEN',
  'UYU',
  'JPY',
  'CNY',
  'TWD',
  'RUB',
  'IDR',
  'INR',
  'KRW',
  'CAD',
  'AUD',
  'NZD',
  'CHF',
  'SEK',
  'NOK',
  'DKK',
  'PLN',
  'CZK',
  'TRY',
  'ZAR',
  'AED',
  'SAR',
  'EGP',
  'THB',
  'PHP',
  'VND',
  'ILS',
] as const

export type Currency = (typeof AVAILABLE_CURRENCIES)[number]

export const getCurrencyName = (currency: string, language?: string) => {
  try {
    return new Intl.DisplayNames([language ?? 'en'], { type: 'currency' }).of(currency) ?? currency
  } catch {
    return currency
  }
}

export const getCurrencySymbol = (currency: string, language?: string) => {
  try {
    const parts = new Intl.NumberFormat(language, {
      style: 'currency',
      currency,
      currencyDisplay: 'narrowSymbol',
    }).formatToParts(0)

    return parts.find(({ type }) => type === 'currency')?.value ?? currency
  } catch {
    return currency
  }
}

const REGION_CURRENCIES: Record<string, Currency> = {
  US: 'USD',
  AR: 'ARS',
  BR: 'BRL',
  MX: 'MXN',
  CL: 'CLP',
  CO: 'COP',
  PE: 'PEN',
  UY: 'UYU',
  ES: 'EUR',
  PT: 'EUR',
  FR: 'EUR',
  DE: 'EUR',
  IT: 'EUR',
  NL: 'EUR',
  IE: 'EUR',
  AT: 'EUR',
  BE: 'EUR',
  GR: 'EUR',
  FI: 'EUR',
  GB: 'GBP',
  JP: 'JPY',
  CN: 'CNY',
  TW: 'TWD',
  RU: 'RUB',
  ID: 'IDR',
  IN: 'INR',
  KR: 'KRW',
  CA: 'CAD',
  AU: 'AUD',
  NZ: 'NZD',
  CH: 'CHF',
  SE: 'SEK',
  NO: 'NOK',
  DK: 'DKK',
  PL: 'PLN',
  CZ: 'CZK',
  TR: 'TRY',
  ZA: 'ZAR',
  AE: 'AED',
  SA: 'SAR',
  EG: 'EGP',
  TH: 'THB',
  PH: 'PHP',
  VN: 'VND',
  IL: 'ILS',
}

export const FALLBACK_CURRENCY: Currency = 'USD'

export const getCurrencyForRegion = (region?: string): Currency | undefined =>
  region ? REGION_CURRENCIES[region.toUpperCase()] : undefined

export const isSupportedCurrency = (currency?: string): currency is Currency =>
  !!currency && (AVAILABLE_CURRENCIES as readonly string[]).includes(currency)

export const getDefaultCurrency = (detected?: string): Currency => {
  if (isSupportedCurrency(detected)) return detected

  const languages = typeof navigator !== 'undefined' ? [navigator.language, ...(navigator.languages ?? [])] : []

  for (const language of languages) {
    try {
      const region = new Intl.Locale(language).region

      if (region && REGION_CURRENCIES[region]) return REGION_CURRENCIES[region]
    } catch {
      continue
    }
  }

  return FALLBACK_CURRENCY
}
