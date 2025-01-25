export const formatAmount = (amount: number, language?: string, fractionDigits = 2) => {
  return new Intl.NumberFormat(language, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount)
}
