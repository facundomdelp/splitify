import { Balance } from '@/types/balance.types'
import { useGetEmojiFromString } from './useGetEmojiFromString'
import { useMemo } from 'react'
import { formatAmount } from '../functions/formatAmount'
import { useTranslations } from 'next-intl'

interface useCopyStringProps {
  balances: Balance[]
  rounded: boolean
}

export const useCopyString = ({ balances, rounded }: useCopyStringProps) => {
  const getEmojiFromString = useGetEmojiFromString()
  const t = useTranslations('useCopyString')

  return useMemo(
    () =>
      [
        ...balances.map(
          (balance) =>
            `${getEmojiFromString(balance.debtor)} ${balance.debtor} ${t('owes')} $${formatAmount(balance.amount, rounded ? 0 : 2)} ${t('to')} ${getEmojiFromString(balance.creditor)} ${balance.creditor}`,
        ),
        '\nhttps://splitify.me',
      ].join('\n'),
    [balances, getEmojiFromString, t, rounded],
  )
}
