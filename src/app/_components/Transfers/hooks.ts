import { formatAmount } from '@/lib/functions/formatAmount'
import { useGetEmojiFromString } from '@/lib/hooks/useGetEmojiFromString'
import { Transfer } from '@/types/Transfer'
import { useMemo } from 'react'

interface Props {
  transfers: Transfer[]
  fractionDigits: number
}

export const useCopyString = ({ transfers, fractionDigits }: Props) => {
  const getEmojiFromString = useGetEmojiFromString()

  return useMemo(
    () =>
      [
        ...transfers.map(
          (transfer) =>
            `${getEmojiFromString(transfer.debtor)} ${transfer.debtor} debe $${formatAmount(transfer.amount, fractionDigits)} a ${getEmojiFromString(transfer.creditor)} ${transfer.creditor}`,
        ),
        '\nhttps://splitify.me/share',
      ].join('\n'),
    [fractionDigits, getEmojiFromString, transfers],
  )
}
