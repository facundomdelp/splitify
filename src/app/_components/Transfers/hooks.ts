import { copyToClipboard } from '@/lib/functions/copyToClipboard'
import { formatAmount } from '@/lib/functions/formatAmount'
import { getEmojiFromString } from '@/lib/functions/getEmojiFromString'
import { Transfer } from '@/types'
import { useState } from 'react'

export const useCopyTransfersToClipboard = ({ transfers }: { transfers: Transfer[] }) => {
  const [copied, setCopied] = useState(false)

  const handleCopyToClipboard = () => {
    copyToClipboard(
      [
        ...transfers.map(
          (transfer) =>
            `${getEmojiFromString(transfer.debtor)} ${transfer.debtor} debe $${formatAmount(transfer.amount)} a ${transfer.creditor} ${getEmojiFromString(transfer.creditor)}`,
        ),
        '\nhttps://splitify.me/share',
      ].join('\n'),
    )

    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return { handleCopyToClipboard, copied }
}
