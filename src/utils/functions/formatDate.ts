import { NAVIGATOR_LANGUAGE } from '../constants/navigatorLanguage'

export const formatDate = (value: number | string | Date) => {
  return new Date(value).toLocaleDateString(NAVIGATOR_LANGUAGE)
}
