import { Expenses } from '@/components/Expenses/Expenses'
import ExpensesForm from '@/components/ExpensesForm'
import Modal from '@/components/Modal'
import { cn } from '@/lib/utils'
import { Expense } from '@/types/expense.types'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

interface Props {
  expenses: Expense[]
  addExpense: (expense: Pick<Expense, 'name' | 'amount' | 'title' | 'date'>) => void
  removeExpense: (id: string) => void
  loadingExpenses?: boolean
  disabled?: boolean
}

const ExpensesSection = ({ expenses, addExpense, removeExpense, loadingExpenses, disabled }: Props) => {
  const [openModal, setOpenModal] = useState(false)

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
    setOpenModal(false)

    name = name.trim()
    title = title?.trim()
    date = date ? new Date(date).getTime() : undefined

    addExpense({ name, amount, title, date })
  }

  const t = useTranslations('ExpensesSection')

  return (
    <>
      <Modal open={openModal} setOpen={setOpenModal} title={t('Add Expense')} className='px-6 w-[90vw] max-w-[500px]'>
        <ExpensesForm includeDetails bigAddButton onSubmit={handleSubmit} disabled={disabled} />
      </Modal>

      <section
        className={cn('flex flex-col gap-8 flex-1 min-w-0 cursor-default mx-4', disabled ? 'pointer-events-none' : '')}
      >
        <ExpensesForm onFocus={() => setOpenModal(true)} disabled={disabled} />
        <Expenses expenses={expenses} onRemoveExpense={removeExpense} loading={loadingExpenses} />
      </section>
    </>
  )
}

export default ExpensesSection
