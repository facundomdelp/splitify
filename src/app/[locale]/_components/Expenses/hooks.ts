import { generateId } from '@/lib/functions/generateId'
import { useSetMetadata } from '@/components/store/metadata'
import { Expense } from '@/types/Expense'
import { useState } from 'react'

interface useExpensesFormProps {
  expenses: Expense[]
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
  nameInputRef: React.RefObject<HTMLInputElement>
}

export const useExpensesForm = ({ expenses, setExpenses, nameInputRef }: useExpensesFormProps) => {
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

    const id = generateId()
    setExpenses([...(expenses ?? []), { id, name: name.trim(), amount }])

    setName('')
    setAmount(0)

    if (nameInputRef.current) {
      nameInputRef.current.focus()
    }
  }

  return { name, handleName, amount, handleAmount, handleSubmit }
}

export const useHandleChangeEmojis = () => {
  const [rotate, setRotate] = useState(false)
  const [metadata, setMetadata] = useSetMetadata()

  const handleChangeEmojis = () => {
    setRotate(true)
    setTimeout(() => setRotate(false), 500)

    setMetadata({
      ...metadata,
      emojiHash: Math.floor(Math.random() * 1000),
    })
  }

  return { handleChangeEmojis, rotate }
}
