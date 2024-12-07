import { formatAmount } from '@/lib/functions/formatAmount'
import { useGetEmojiFromString } from '@/lib/hooks/useGetEmojiFromString'
import { Transfer } from '@/types/Transfer'
import { useMemo } from 'react'

interface Props {
  transfers: Transfer[]
  rounded: boolean
}

export const useCopyString = ({ transfers, rounded }: Props) => {
  const getEmojiFromString = useGetEmojiFromString()

  return useMemo(
    () =>
      [
        ...transfers.map(
          (transfer) =>
            `${getEmojiFromString(transfer.debtor)} ${transfer.debtor} debe $${formatAmount(transfer.amount, rounded ? 0 : 2)} a ${getEmojiFromString(transfer.creditor)} ${transfer.creditor}`,
        ),
        '\nhttps://splitify.me',
      ].join('\n'),
    [getEmojiFromString, rounded, transfers],
  )
}
