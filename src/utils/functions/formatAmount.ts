interface FormatAmountOptions {
  language?: string
  fractionDigits?: number
  currency?: string
}

export const formatAmount = (amount: number, { language, fractionDigits = 2, currency }: FormatAmountOptions = {}) => {
  return new Intl.NumberFormat(language, {
    ...(currency ? { style: 'currency' as const, currency, currencyDisplay: 'narrowSymbol' as const } : {}),
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount)
}
