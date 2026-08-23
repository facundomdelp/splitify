export type Locale = 'en' | 'es' | 'pt-BR' | 'pt-PT' | 'zh-CN' | 'zh-TW' | 'ar' | 'fr' | 'ja' | 'ru' | 'de' | 'id'

export type Metadata = {
  isLoaded: boolean
  emojiHash?: number
  hideTitleBanner?: boolean
  currency?: string
  currencySource?: 'auto' | 'user'
  theme?: 'system' | 'light' | 'dark'
}

export type GeoLocation = {
  countryCode: string
  currency?: string
}

type ValidationError = {
  field: string
  message: string
}

export type ValidationResult<T> = [T | null, ValidationError[] | null]
