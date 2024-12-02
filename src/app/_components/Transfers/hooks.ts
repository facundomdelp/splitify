import { formatAmount } from '@/lib/functions/formatAmount'
import { useGetEmojiFromString } from '@/lib/hooks/useGetEmojiFromString'
import { Transfer } from '@/types/Transfer'
import { useMemo } from 'react'

export const useCopyString = ({ transfers }: { transfers: Transfer[] }) => {
  const getEmojiFromString = useGetEmojiFromString()

  return useMemo(
    () =>
      [
        ...transfers.map(
          (transfer) =>
            `${getEmojiFromString(transfer.debtor)} ${transfer.debtor} debe $${formatAmount(transfer.amount)} a ${getEmojiFromString(transfer.creditor)} ${transfer.creditor}`,
        ),
        '\nhttps://splitify.me/share',
      ].join('\n'),
    [getEmojiFromString, transfers],
  )
}
