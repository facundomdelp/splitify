'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Expense } from '@/types'
import { Plus, Undo } from 'lucide-react'
import { useExpensesForm } from './hooks'
import { useContext, useRef } from 'react'
import { LanguageContext } from '@/context/LanguageContext'

interface Props {
  expenses: Expense[]
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
  disabled: boolean
  onReturn?: () => void
}

const ExpensesForm = ({ expenses, setExpenses, disabled, onReturn }: Props) => {
  const { t } = useContext(LanguageContext)

  const nameInputRef = useRef<HTMLInputElement>(null)

  const { name, handleName, amount, handleAmount, handleSubmit } = useExpensesForm({
    expenses,
    setExpenses,
    nameInputRef,
  })

  return (
    <section className='flex flex-col gap-2'>
      <p className='text-sm'>{t('Add participant')}</p>
      <form className='flex gap-4 flex-wrap' onSubmit={handleSubmit}>
        <Input
          className='min-w-40 flex-1'
          name='name'
          ref={nameInputRef}
          maxLength={50}
          onChange={handleName}
          value={disabled ? '-' : name}
          disabled={disabled}
        />

        <div className='flex gap-4 ml-auto'>
          <div className='relative min-w-20 max-w-24 flex-1'>
            <span className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm leading-4'>$</span>
            <Input
              className='pl-6 text-sm'
              type='number'
              name='amount'
              max={1000000000}
              min={0}
              step={0.01}
              onChange={handleAmount}
              value={amount}
              disabled={disabled}
            />
          </div>
          {!onReturn ? (
            <Button size='icon' className='min-w-10 ml-auto' type='submit' disabled={name === '' || disabled}>
              <Plus />
            </Button>
          ) : (
            <Button size='icon' className='min-w-10 ml-auto' type='submit' variant='outline' onClick={onReturn}>
              <Undo />
            </Button>
          )}
        </div>
      </form>
    </section>
  )
}

export default ExpensesForm
