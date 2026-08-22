export const MAX_AMOUNT = 1000000000
const MAX_DECIMALS = 2

export const getAmountSeparators = (language?: string) => {
  const parts = new Intl.NumberFormat(language).formatToParts(11111.1)

  return {
    group: parts.find(({ type }) => type === 'group')?.value ?? ',',
    decimal: parts.find(({ type }) => type === 'decimal')?.value ?? '.',
  }
}

export const sanitizeAmountInput = (value: string, language?: string): string => {
  const { decimal } = getAmountSeparators(language)

  const [whole = '', ...decimals] = value
    .replace(/[^\d.,]/g, '')
    .replace(/[.,]/g, decimal)
    .split(decimal)

  const trimmedWhole = whole.replace(/^0+(?=\d)/, '')
  const sanitized = decimals.length
    ? `${trimmedWhole}${decimal}${decimals.join('').slice(0, MAX_DECIMALS)}`
    : trimmedWhole

  return parseAmount(sanitized, language) > MAX_AMOUNT ? String(MAX_AMOUNT) : sanitized
}

export const parseAmount = (value: string, language?: string): number => {
  const { decimal } = getAmountSeparators(language)

  const parsed = Number(value.split(decimal).join('.'))

  return Number.isFinite(parsed) ? parsed : 0
}

export const toAmountInput = (amount: number, language?: string): string => {
  if (!amount) return ''

  const { decimal } = getAmountSeparators(language)

  return String(amount).replace('.', decimal)
}
