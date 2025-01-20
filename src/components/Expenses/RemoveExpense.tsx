'use client'

import ConfirmationModal from '@/components/ConfirmationModal'
import { useGetEmojiFromString } from '@/lib/hooks/useGetEmojiFromString'
import { Expense } from '@/types/expense.types'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

interface Props {
  id: string
  name: string
  expenses: Expense[]
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
  className?: string
}

export const RemoveExpense = ({ id, name, expenses, setExpenses }: Props) => {
  const [open, setOpen] = useState(false)

  const handleRemoveExpense = () => {
    const remainingExpenses = expenses.filter(({ id: expenseId }) => expenseId !== id)
    setExpenses(remainingExpenses)
  }

  const t = useTranslations('RemoveExpense')

  const getEmojiFromString = useGetEmojiFromString()

  return (
    <>
      <X
        className='mx-1 size-[18px] text-gray-500 hover:text-red-800 h-[20px] items-center cursor-pointer shrink-0'
        onClick={() => setOpen(true)}
      />

      <ConfirmationModal
        open={open}
        onOpenChange={setOpen}
        title={
          <>
            {t('Are you sure you want to remove')}
            <div className='flex flex-nowrap space-x-1 min-w-0'>
              <p>{getEmojiFromString(name)}</p>
              <strong className='font-semibold max-w-full text-ellipsis whitespace-nowrap overflow-hidden block'>
                {name}
              </strong>
            </div>
            {t('from the list?')}
          </>
        }
        onConfirm={handleRemoveExpense}
        destructive
      />
    </>
  )
}
