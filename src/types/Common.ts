export type Languages = 'es' | 'en'

export type Translations = Record<string, Record<Exclude<Languages, 'en'>, string>>
