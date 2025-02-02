import { Expense } from '@/types/expense-types'

import { cn } from '@/lib/utils'

import Expenses from '@/components/Expenses'
import ExpensesForm from '@/components/ExpensesForm'

interface Props {
  expenses: Expense[]
  addExpense: (expense: Pick<Expense, 'name' | 'amount' | 'title' | 'date'>) => void
  removeExpense: (id: string) => void
  loadingExpenses?: boolean
  disabled?: boolean
  modalForm?: boolean
}

const ExpensesSection = ({ expenses, addExpense, removeExpense, loadingExpenses, disabled, modalForm }: Props) => {
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
    date = date ? new Date(date).getTime() : undefined

    addExpense({ name, amount, title, date })
  }

  return (
    <section className={cn('flex min-w-0 flex-1 cursor-default flex-col gap-8', disabled ? 'pointer-events-none' : '')}>
      <ExpensesForm onSubmit={handleSubmit} disabled={disabled} modalForm={modalForm} />
      <Expenses expenses={expenses} onRemoveExpense={removeExpense} loading={loadingExpenses} />
    </section>
  )
}

export default ExpensesSection
