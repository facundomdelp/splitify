'use client'

import { ConfirmationModal } from '@/components/ConfirmationModal/ConfirmationModal'
import { getEmojiFromString } from '@/lib/functions/getEmojiFromString'
import { cn } from '@/lib/utils'
import { Expense } from '@/types'
import { X } from 'lucide-react'

interface Props {
  id: string
  name: string
  expenses: Expense[]
  setExpenses: React.Dispatch<React.SetStateAction<Expense[] | undefined>>
  className?: string
}

export const RemoveExpense = ({ id, name, expenses, setExpenses, className }: Props) => {
  const handleRemoveExpense = () => {
    const remainingExpenses = expenses.filter(({ id: expenseId }) => expenseId !== id)
    setExpenses(remainingExpenses)
  }

  return (
    <ConfirmationModal
      title={
        <>
          ¿Estas seguro que quieres eliminar a
          <div className='flex flex-nowrap space-x-1 min-w-0'>
            <p>{getEmojiFromString(name)}</p>
            <strong className='font-semibold max-w-full text-ellipsis whitespace-nowrap overflow-hidden block'>
              {name}
            </strong>
          </div>
          de la lista?
        </>
      }
      onConfirm={handleRemoveExpense}
    >
      <X className={cn('size-[18px] text-gray-500 hover:text-red-800 h-[20px] items-center', className)} />
    </ConfirmationModal>
  )
}
