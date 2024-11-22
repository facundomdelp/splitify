import { calculateTransfers } from '@/lib/functions/calculateTransfers'
import { copyToClipboard } from '@/lib/functions/copyToClipboard'
import { formatAmount } from '@/lib/functions/formatAmount'
import { getEmojiFromString } from '@/lib/functions/getEmojiFromString'
import { useLocalStorage } from '@/lib/hooks/useLocalStore'
import { Expenses, Transfer } from '@/types'
import { useState } from 'react'

export const useHandleParticipantsForm = () => {
  const [amount, setAmount] = useState(0)
  const [name, setName] = useState('')

  const [participants, setParticipants] = useLocalStorage<Expenses>('participants', {})

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (value.startsWith('0') && value.length > 1 && !value.includes('.')) {
      e.target.value = value.slice(1)
    }

    const amount = parseFloat(value)
    const max = parseFloat(e.target.max)
    const min = parseFloat(e.target.min)
    const step = parseFloat(e.target.step)

    if (!amount) {
      setAmount(0)
    }

    if (amount >= min && amount <= max && (amount % step === 0 || (amount * 100) % (step * 100) === 0)) {
      setAmount(amount)
    }
  }

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const maxLength = e.target.maxLength

    if (value.length <= maxLength) {
      setName(e.target.value)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name.trim()) return

    setParticipants({ ...participants, [name.trim()]: amount })

    setName('')
    setAmount(0)
  }

  return { participants, setParticipants, name, amount, handleAmount, handleName, handleSubmit }
}

export const useCalculateTransfers = ({
  participants,
  setParticipants,
}: {
  participants: Expenses
  setParticipants: React.Dispatch<React.SetStateAction<Expenses>>
}) => {
  const [transfers, setTransfers] = useLocalStorage<Transfer[]>('transfers', [])

  const handleCalculateTransfers = () => {
    setTransfers(calculateTransfers(participants))
    setParticipants({})
  }

  return { transfers, setTransfers, handleCalculateTransfers }
}

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
