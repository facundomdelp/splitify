import { useMemo, useState } from 'react'

import { ExpenseDraft } from '@/types/expense-types'

interface useExpensesFormProps {
  initialValues: ExpenseDraft
  participants: string[]
  nameInputRef: React.RefObject<HTMLInputElement>
  onSubmit?: (expense: ExpenseDraft) => void
  closeModal?: () => void
}

export const useExpensesForm = ({
  initialValues,
  participants,
  nameInputRef,
  onSubmit,
  closeModal,
}: useExpensesFormProps) => {
  const [name, setName] = useState(initialValues.name)
  const [amount, setAmount] = useState(initialValues.amount)

  const [title, setTitle] = useState(initialValues.title)
  const [date, setDate] = useState(initialValues.date ? new Date(initialValues.date).toISOString().split('T')[0] : '')

  const [extraNames, setExtraNames] = useState<string[]>([])
  const [excludedNames, setExcludedNames] = useState<string[]>(() =>
    initialValues.sharedWith?.length
      ? participants.filter((participant) => !initialValues.sharedWith?.includes(participant))
      : [],
  )

  const knownNames = useMemo(
    () => [...new Set([...participants, ...extraNames, name.trim()])].filter((known) => known !== ''),
    [extraNames, name, participants],
  )

  const sharedWith = useMemo(
    () => knownNames.filter((known) => !excludedNames.includes(known)),
    [knownNames, excludedNames],
  )

  const sharingSuggestions = useMemo(
    () => knownNames.filter((known) => excludedNames.includes(known)),
    [knownNames, excludedNames],
  )

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

  const handleAddSharer = (participant: string) => {
    setExtraNames((prev) => (prev.includes(participant) ? prev : [...prev, participant]))
    setExcludedNames((prev) => prev.filter((excluded) => excluded !== participant))
  }

  const handleRemoveSharer = (participant: string) => {
    setExcludedNames((prev) => (prev.includes(participant) ? prev : [...prev, participant]))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const sharedWithEveryone = !excludedNames.length && !extraNames.length

    onSubmit?.({
      name,
      amount,
      title,
      date: date ? new Date(date).getTime() : undefined,
      sharedWith: sharedWithEveryone ? [] : sharedWith,
    })

    setName('')
    setAmount(0)
    setExtraNames([])
    setExcludedNames([])
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
    sharedWith,
    sharingSuggestions,
    handleAddSharer,
    handleRemoveSharer,
    handleSubmit,
  }
}
