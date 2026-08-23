'use client'

import { useLocale } from 'next-intl'

import { useResolvedCurrency } from '@/components/CurrencyProvider'

import { formatAmount } from '@/utils/functions/formatAmount'

interface Props {
  children: number
  fractionDigits?: number
}

const Amount = ({ children, fractionDigits }: Props) => {
  const locale = useLocale()
  const currency = useResolvedCurrency()

  return <>{formatAmount(children, { language: locale, fractionDigits, currency })}</>
}

export default Amount
