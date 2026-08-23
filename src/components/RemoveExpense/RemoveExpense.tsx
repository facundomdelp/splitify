'use client'

import { useState } from 'react'

import ExpenseRemoveConfirmModal from '@/components/ExpenseRemoveConfirmModal'

import { X } from 'lucide-react'

interface Props {
  id: string
  name: string
  onRemoveExpense: (id: string) => void
}

const RemoveExpense = ({ id, name, onRemoveExpense }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <X
        className='text-muted-foreground hover:text-destructive mx-1 size-[18px] h-[20px] shrink-0 cursor-pointer items-center'
        onClick={() => setOpen(true)}
      />

      <ExpenseRemoveConfirmModal open={open} setOpen={setOpen} name={name} onConfirm={() => onRemoveExpense(id)} />
    </>
  )
}

export default RemoveExpense
