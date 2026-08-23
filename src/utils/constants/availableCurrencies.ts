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
