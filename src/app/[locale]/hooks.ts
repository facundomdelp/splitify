import { useRouter } from '@/i18n/routing'
import { CustomError } from '@/lib/errors/CustomErrors'
import { generateId } from '@/lib/functions/generateId'
import { Balance } from '@/types/balance.types'
import { Expense } from '@/types/expense.types'
import { useState } from 'react'

interface useAddExpenseProps {
  expenses: Expense[]
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
}

export const useAddExpense = ({ expenses, setExpenses }: useAddExpenseProps) => {
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
    const expenseUiId = generateId()
    const newExpenses = [...(expenses ?? []), { id: expenseUiId, optimistic: false, name, amount, title, date }]

    setExpenses(newExpenses)
  }

  return { addExpense }
}

interface useConvertIntoGroupProps {
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
  setBalances: React.Dispatch<React.SetStateAction<Balance[]>>
}

export const useConvertIntoGroup = ({ setExpenses, setBalances }: useConvertIntoGroupProps) => {
  const [convertToGroupState, setConvertToGroupState] = useState({
    loading: false,
    error: false,
  })
  const router = useRouter()

  const convertIntoGroup = async (expenses: Expense[]) => {
    setConvertToGroupState({ error: false, loading: true })

    try {
      const addGroupResponse = await fetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!addGroupResponse.ok) {
        throw new CustomError(addGroupResponse.status)
      }

      const data = await addGroupResponse.json()

      for (const expense of expenses) {
        // Bulk Add Expenses?
        const addExpensesToGroup = await fetch('/api/expenses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            groupId: data.group,
            name: expense.name,
            amount: expense.amount,
            title: expense.title,
            date: expense.date,
          }),
        })

        if (!addExpensesToGroup.ok) {
          throw new CustomError(addGroupResponse.status)
        }
      }

      setExpenses([])
      setBalances([])

      router.push(`/groups/${data.group}`)
    } catch {
      setConvertToGroupState((prev) => ({ ...prev, error: true }))
    } finally {
      setTimeout(() => {
        setConvertToGroupState((prev) => ({ ...prev, loading: false }))
      }, 500)
    }
  }

  return { convertIntoGroup, convertToGroupState }
}
