import { useMemo, useState } from 'react'

import { ExpenseDraft } from '@/types/expense-types'

import { parseAmount, sanitizeAmountInput, toAmountInput } from '@/utils/functions/parseAmount'

interface useExpensesFormProps {
  initialValues: ExpenseDraft
  participants: string[]
  nameInputRef: React.RefObject<HTMLInputElement | null>
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
  const language = typeof navigator !== 'undefined' ? navigator.language : undefined

  const [name, setName] = useState(initialValues.name)
  const [amountInput, setAmountInput] = useState(() => toAmountInput(initialValues.amount, language))

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
    setAmountInput(sanitizeAmountInput(e.target.value, language))
  }

  const handleAmountBlur = () => {
    setAmountInput(toAmountInput(parseAmount(amountInput, language), language))
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
      amount: parseAmount(amountInput, language),
      title,
      date: date ? new Date(date).getTime() : undefined,
      sharedWith: sharedWithEveryone ? [] : sharedWith,
    })

    setName('')
    setAmountInput('')
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
    amountInput,
    handleAmount,
    handleAmountBlur,
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
