import { useMemo } from 'react'

import { useLocale, useTranslations } from 'next-intl'

import { Balance } from '@/types/balance-types'

import { useResolvedCurrency } from '@/components/CurrencyProvider'

import { formatAmount } from '../functions/formatAmount'
import { useGetEmojiFromString } from './useGetEmojiFromString'

interface useCopyStringProps {
  balances: Balance[]
  rounded: boolean
}

export const useCopyString = ({ balances, rounded }: useCopyStringProps) => {
  const getEmojiFromString = useGetEmojiFromString()
  const locale = useLocale()
  const currency = useResolvedCurrency()
  const t = useTranslations('useCopyString')

  return useMemo(
    () =>
      [
        ...balances.map(
          (balance) =>
            `${getEmojiFromString(balance.debtor)} ${balance.debtor} ${t('owes')} ${formatAmount(balance.amount, { language: locale, fractionDigits: rounded ? 0 : 2, currency })} ${t('to')} ${getEmojiFromString(balance.creditor)} ${balance.creditor}`,
        ),
        '\nhttps://splitify.me',
      ].join('\n'),
    [balances, getEmojiFromString, t, rounded, locale, currency],
  )
}
