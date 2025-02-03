import { useState } from 'react'

import { useRouter } from '@/i18n/routing'

import { Balance } from '@/types/balance-types'
import { Expense } from '@/types/expense-types'

import { CustomError } from '@/utils/errors/CustomErrors'
import { generateId } from '@/utils/functions/generateId'

interface useAddExpenseProps {
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
}

export const useAddExpense = ({ setExpenses }: useAddExpenseProps) => {
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
    setExpenses((prev) => [...(prev ?? []), { id: expenseUiId, optimistic: false, name, amount, title, date }])
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
        const { name, amount, title, date } = expense

        // Bulk Add Expenses?
        const addExpensesToGroupResponse = await fetch(`/api/groups/${data.group}/expenses`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            amount,
            title,
            date,
          }),
        })

        if (!addExpensesToGroupResponse.ok) {
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

interface useRemoveExpenseProps {
  expenses: Expense[]
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
}

export const useRemoveExpense = ({ expenses, setExpenses }: useRemoveExpenseProps) => {
  const removeExpense = async (id: string) => {
    const remainingExpenses = expenses.filter(({ id: expenseId }) => expenseId !== id)
    setExpenses(remainingExpenses)
  }

  return { removeExpense }
}
