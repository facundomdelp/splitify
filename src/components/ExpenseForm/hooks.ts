import { useState } from 'react'

interface useExpensesFormProps {
  initialValues: { name: string; amount: number; title?: string; date?: number }
  nameInputRef: React.RefObject<HTMLInputElement>
  onSubmit?: ({ name, amount, title, date }: { name: string; amount: number; title?: string; date?: number }) => void
  closeModal?: () => void
}

export const useExpensesForm = ({ initialValues, nameInputRef, onSubmit, closeModal }: useExpensesFormProps) => {
  const [name, setName] = useState(initialValues.name)
  const [amount, setAmount] = useState(initialValues.amount)

  const [title, setTitle] = useState(initialValues.title)
  const [date, setDate] = useState(initialValues.date ? new Date(initialValues.date).toISOString().split('T')[0] : '')

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

    onSubmit?.({ name, amount, title, date: date ? new Date(date).getTime() : undefined })

    setName('')
    setAmount(0)
    closeModal?.()

    if (nameInputRef.current) {
      nameInputRef.current.focus()
    }
  }

  return {
    name,
    handleName,
    amount,
    handleAmount,
    title,
    handleTitle,
    date,
    handleDate,
    handleSubmit,
  }
}
