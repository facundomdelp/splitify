import { Expenses } from '@/types'
import { useState } from 'react'

interface useParticipantsFormProps {
  participants: Expenses
  setParticipants: React.Dispatch<React.SetStateAction<Expenses>>
}

export const useParticipantsForm = ({ participants, setParticipants }: useParticipantsFormProps) => {
  const [amount, setAmount] = useState(0)
  const [name, setName] = useState('')

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (value.startsWith('0') && value.length > 1 && !value.includes('.')) {
      e.target.value = value.slice(1)
    }

    const decimalIndex = value.indexOf('.')
    if (decimalIndex !== -1 && value.slice(decimalIndex + 1).length > 2) {
      e.target.value = value.slice(0, decimalIndex + 3)
      return
    }

    const amount = parseFloat(value)

    if (!amount) {
      setAmount(0)
      return
    }

    const max = parseFloat(e.target.max)
    const min = parseFloat(e.target.min)
    const step = parseFloat(e.target.step)

    if (amount >= min && amount <= max) {
      const roundedAmount = Number(amount.toFixed(2))
      const steps = Math.round((roundedAmount - min) / step)
      const adjustedAmount = Number((min + steps * step).toFixed(2))

      setAmount(adjustedAmount)
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

  return { name, handleName, amount, handleAmount, handleSubmit }
}
