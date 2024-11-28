import { formatAmount } from '@/lib/functions/formatAmount'
import { getEmojiFromString } from '@/lib/functions/getEmojiFromString'
import { Transfer } from '@/types/Transfer'
import { useMemo } from 'react'

export const useCopyString = ({ transfers }: { transfers: Transfer[] }) => {
  return useMemo(
    () =>
      [
        ...transfers.map(
          (transfer) =>
            `${getEmojiFromString(transfer.debtor)} ${transfer.debtor} debe $${formatAmount(transfer.amount)} a ${transfer.creditor} ${getEmojiFromString(transfer.creditor)}`,
        ),
        '\nhttps://splitify.me/share',
      ].join('\n'),
    [transfers],
  )
}
