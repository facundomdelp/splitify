export type Language = 'es' | 'en'

export type Translations = Record<string, Record<Exclude<Language, 'en'>, string>>
