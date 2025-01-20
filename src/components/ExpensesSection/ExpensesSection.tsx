import { Expenses } from '@/components/Expenses/Expenses'
import ExpensesForm from '@/components/ExpensesForm'
import Modal from '@/components/Modal'
import { cn } from '@/lib/utils'
import { Expense } from '@/types/expense.types'
import React, { useState } from 'react'

interface Props {
  expenses: Expense[]
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
  addExpenseAction: (expense: Pick<Expense, 'name' | 'amount' | 'title' | 'date'>) => void | Promise<void>
  loadingExpenses?: boolean
  disabled?: boolean
}

const ExpensesSection = ({ expenses, setExpenses, addExpenseAction, loadingExpenses, disabled }: Props) => {
  const [openModal, setOpenModal] = useState(false)

  const addExpense = async ({
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

    addExpenseAction({ name, amount, title, date })
  }

  return (
    <>
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        title={'Add Expense'}
        className='px-6 xs:px-8 w-[90vw] max-w-[500px]'
      >
        <ExpensesForm includeDetails bigAddButton onSubmit={addExpense} disabled={disabled} />
      </Modal>

      <section
        className={cn('flex flex-col gap-8 flex-1 min-w-0 cursor-default mx-4', disabled ? 'pointer-events-none' : '')}
      >
        <ExpensesForm onFocus={() => setOpenModal(true)} disabled={disabled} />
        <Expenses expenses={expenses} setExpenses={setExpenses} loading={loadingExpenses} />
      </section>
    </>
  )
}

export default ExpensesSection
