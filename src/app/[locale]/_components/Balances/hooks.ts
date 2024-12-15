import { formatAmount } from '@/lib/functions/formatAmount'
import { useGetEmojiFromString } from '@/lib/hooks/useGetEmojiFromString'
import { Balance } from '@/types/Balance'
import { useMemo } from 'react'

interface Props {
  balances: Balance[]
  rounded: boolean
}

export const useCopyString = ({ balances, rounded }: Props) => {
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
