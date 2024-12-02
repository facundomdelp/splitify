export const formatAmount = (amount: number, fractionDigits = 2) =>
  new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount)
