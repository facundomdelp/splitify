import { useState } from 'react'

interface useExpensesFormProps {
  nameInputRef: React.RefObject<HTMLInputElement>
  onSubmit?: ({ name, amount, title, date }: { name: string; amount: number; title?: string; date?: string }) => void
}

export const useExpensesForm = ({ nameInputRef, onSubmit }: useExpensesFormProps) => {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState(0)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const maxLength = e.target.maxLength

    if (value.length <= maxLength) {
      setName(e.target.value)
    }
  }

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

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const maxLength = e.target.maxLength

    if (value.length <= maxLength) {
      setTitle(e.target.value)
    }
  }

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    onSubmit?.({ name, amount, title, date })

    setName('')
    setAmount(0)

    if (nameInputRef.current) {
      nameInputRef.current.focus()
    }
  }

  return { name, handleName, amount, handleAmount, title, handleTitle, date, handleDate, handleSubmit }
}
