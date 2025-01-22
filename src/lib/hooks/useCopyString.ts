import { Balance } from '@/types/balance.types'
import { useGetEmojiFromString } from './useGetEmojiFromString'
import { useMemo } from 'react'
import { formatAmount } from '../functions/formatAmount'

interface useCopyStringProps {
  balances: Balance[]
  rounded: boolean
}

export const useCopyString = ({ balances, rounded }: useCopyStringProps) => {
  const getEmojiFromString = useGetEmojiFromString()

  return useMemo(
    () =>
      [
        ...balances.map(
          (balance) =>
            `${getEmojiFromString(balance.debtor)} ${balance.debtor} debe $${formatAmount(balance.amount, rounded ? 0 : 2)} a ${getEmojiFromString(balance.creditor)} ${balance.creditor}`,
        ),
        '\nhttps://splitify.me',
      ].join('\n'),
    [getEmojiFromString, rounded, balances],
  )
}
