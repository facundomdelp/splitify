export type Language = 'es' | 'en'

export type Translations = Record<string, Record<Exclude<Language, 'en'>, string>>

export type Metadata = {
  emojiHash: string
}
