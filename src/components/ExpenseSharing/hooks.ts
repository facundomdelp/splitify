import { useState } from 'react'

interface useExpenseSharingProps {
  sharedWith: string[]
  onAdd: (name: string) => void
}

export const useExpenseSharing = ({ sharedWith, onAdd }: useExpenseSharingProps) => {
  const [open, setOpen] = useState(false)
  const [newName, setNewName] = useState('')

  const trimmedNewName = newName.trim()
  const canAdd = trimmedNewName !== '' && !sharedWith.includes(trimmedNewName)

  const toggleOpen = () => setOpen((prev) => !prev)

  const handleNewName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, maxLength } = e.target

    if (value.length <= maxLength) {
      setNewName(value)
    }
  }

  const handleAdd = () => {
    if (!canAdd) return

    onAdd(trimmedNewName)
    setNewName('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return

    e.preventDefault()
    handleAdd()
  }

  return { open, toggleOpen, newName, handleNewName, handleAdd, handleKeyDown, canAdd }
}
