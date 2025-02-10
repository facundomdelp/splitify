import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { Expense } from '@/types/expense-types'

import { cn } from '@/lib/utils'

import ExpenseForm from '@/components/ExpenseForm'
import Expenses from '@/components/Expenses'

import DrawerModal from '../DrawerModal'
import { Button } from '../ui/button'

interface Props {
  expenses: Expense[]
  addExpense: (expense: Omit<Expense, 'id'>) => void
  removeExpense: (id: string) => void
  editExpense?: (expense: Expense) => void
  loadingExpenses?: boolean
  disabled?: boolean
  modalForm?: boolean
}

const ExpensesSection = ({
  expenses,
  addExpense,
  removeExpense,
  editExpense,
  loadingExpenses,
  disabled,
  modalForm,
}: Props) => {
  const [open, setOpen] = useState(false)

  const t = useTranslations('ExpenseSection')

  const handleSubmit = ({
    name,
    amount,
    title,
    date,
  }: {
    name: string
    amount: number
    title?: string
    date?: number
  }) => {
    name = name.trim()
    title = title?.trim()

    addExpense({ name, amount, title, date })
  }

  return (
    <section className={cn('flex min-w-0 flex-1 cursor-default flex-col gap-8', disabled ? 'pointer-events-none' : '')}>
      {modalForm ? (
        <>
          <Button
            variant='outline'
            className='border border-green-500 text-green-500 hover:bg-inherit hover:text-green-500 hover:opacity-70'
            onClick={() => setOpen(true)}
          >
            {t('Add Expense')}
          </Button>

          <DrawerModal open={open} setOpen={setOpen} title={t('Add Expense')} className='px-4'>
            <ExpenseForm
              autoFocus
              fullForm
              onSubmit={handleSubmit}
              disabled={disabled}
              closeModal={() => setOpen(false)}
              submitButtonCopy={t('Add')}
            />
          </DrawerModal>
        </>
      ) : (
        <ExpenseForm
          onSubmit={handleSubmit}
          closeModal={() => setOpen(false)}
          disabled={disabled}
          submitButtonCopy={t('Add')}
        />
      )}

      <Expenses
        expenses={expenses}
        onRemoveExpense={removeExpense}
        onEditExpense={editExpense}
        loading={loadingExpenses}
      />
    </section>
  )
}

export default ExpensesSection
