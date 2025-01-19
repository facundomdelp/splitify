import { Expenses } from '@/components/Expenses/Expenses'
import ExpensesForm from '@/components/ExpensesForm'
import Modal from '@/components/Modal'
import { Expense } from '@/types/expense.types'
import React, { useState } from 'react'

interface Props {
  expenses: Expense[]
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
  addExpenseAction: (expense: Pick<Expense, 'name' | 'amount' | 'title' | 'date'>) => void | Promise<void>
  loadingExpenses?: boolean
}

const ExpensesSection = ({ expenses, setExpenses, addExpenseAction, loadingExpenses }: Props) => {
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
    // setExpenses(newExpenses)

    // try {
    //   const response = await fetch('/api/expenses', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       groupId,
    //       name,
    //       amount,
    //       title,
    //       date,
    //     }),
    //   })

    //   if (!response.ok) {
    //     throw new CustomError(response.status)
    //   }

    //   setExpenses((prevExpenses) =>
    //     prevExpenses.map((expense) => (expense.id === expenseUiId ? { ...expense, optimistic: false } : expense)),
    //   )
    // } catch {
    //   // Put in red with a warning, a tooltip and a try again button
    // }
  }

  return (
    <>
      <Modal open={openModal} setOpen={setOpenModal} title={'Add Expense'} className='px-0 w-[90vw] max-w-[500px]'>
        <ExpensesForm includeDetails bigAddButton onSubmit={addExpense} />
      </Modal>

      <section className='flex flex-col gap-8 flex-1 min-w-0 cursor-default'>
        <ExpensesForm onFocus={() => setOpenModal(true)} />
        <Expenses expenses={expenses} setExpenses={setExpenses} loading={loadingExpenses} />
      </section>
    </>
  )
}

export default ExpensesSection
