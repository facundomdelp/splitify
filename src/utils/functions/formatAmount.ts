import { NAVIGATOR_LANGUAGE } from '../constants/navigatorLanguage'

export const formatAmount = (amount: number, fractionDigits = 2) => {
  return new Intl.NumberFormat(NAVIGATOR_LANGUAGE, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount)
}
