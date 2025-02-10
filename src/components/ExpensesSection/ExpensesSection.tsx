import { Expense } from '@/types/expense-types'

import { cn } from '@/lib/utils'

import ExpenseForm from '@/components/ExpenseForm'
import Expenses from '@/components/Expenses'

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
      <ExpenseForm onSubmit={handleSubmit} disabled={disabled} modalForm={modalForm} />
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
