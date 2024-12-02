'use client'

import ConfirmationModal from '@/components/ConfirmationModal'
import { useGetEmojiFromString } from '@/lib/hooks/useGetEmojiFromString'
import { useTranslate } from '@/lib/hooks/useTranslate'
import { cn } from '@/lib/utils'
import { Translations } from '@/types/Common'
import { Expense } from '@/types/Expense'
import { X } from 'lucide-react'

interface Props {
  id: string
  name: string
  expenses: Expense[]
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
  className?: string
}

export const RemoveExpense = ({ id, name, expenses, setExpenses, className }: Props) => {
  const handleRemoveExpense = () => {
    const remainingExpenses = expenses.filter(({ id: expenseId }) => expenseId !== id)
    setExpenses(remainingExpenses)
  }

  const t = useTranslate(translations)

  const getEmojiFromString = useGetEmojiFromString()

  return (
    <ConfirmationModal
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
    >
      <X
        className={cn('size-[18px] text-gray-500 hover:text-red-800 h-[20px] items-center cursor-pointer', className)}
      />
    </ConfirmationModal>
  )
}

const translations = {
  'Are you sure you want to remove': {
    es: '¿Estas seguro de que quieres eliminar a',
  },
  'from the list?': {
    es: 'de la lista',
  },
} satisfies Translations
