import { useCallback, useEffect, useState } from 'react'

import { useParams } from 'next/navigation'

import { Expense, ExpenseDraft } from '@/types/expense-types'
import { GetGroupResponse } from '@/types/group-types'

import { useSetGroups } from '@/store/groups-store'

import { CustomError } from '@/utils/errors/CustomErrors'
import { generateId } from '@/utils/functions/generateId'

export const useGetGroup = () => {
  const { groups, setGroups, initialized } = useSetGroups()

  const [{ loading, error }, setGetGroupState] = useState<{ loading: boolean; error: number | null }>({
    loading: true,
    error: null,
  })

  const { id } = useParams<{ id: string }>()

  const getGroup = useCallback(async () => {
    try {
      const response = await fetch(`/api/groups/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        throw new CustomError(response.status)
      }

      const data: GetGroupResponse = await response.json()

      const groupIndex = groups.findIndex((group) => group.id === data.group.id)
      if (groupIndex === -1) {
        setGroups((prev) => [...(prev ?? []), data.group])
      } else {
        const newGroups = [...groups]
        newGroups[groupIndex] = data.group
        setGroups(newGroups)
      }
    } catch (e) {
      if (e instanceof CustomError) {
        setGetGroupState((prev) => ({ ...prev, error: e.status }))
      }
    } finally {
      setGetGroupState((prev) => ({ ...prev, loading: false }))
    }
  }, [groups, id, setGroups])

  useEffect(() => {
    if (initialized) {
      getGroup()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized])

  return { loading, error, group: groups.find((group) => group.id === id) }
}

export const useGetGroupExpenses = () => {
  const [expenses, setExpenses] = useState<(Expense & { optimistic?: boolean })[]>()
  const [{ loading, error }, setGetExpensesState] = useState<{ loading: boolean; error: number | null }>({
    loading: true,
    error: null,
  })

  const { id } = useParams<{ id: string }>()

  const getGroupExpenses = useCallback(async () => {
    try {
      const response = await fetch(`/api/groups/${id}/expenses`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        throw new CustomError(response.status)
      }

      const data: { group: Expense[] } = await response.json()
      setExpenses(data.group)
    } catch (e) {
      if (e instanceof CustomError) {
        setGetExpensesState((prev) => ({ ...prev, error: e.status }))
      }
    } finally {
      setGetExpensesState((prev) => ({ ...prev, loading: false }))
    }
  }, [id])

  useEffect(() => {
    if (!expenses) {
      getGroupExpenses()
    }
  }, [expenses, getGroupExpenses])

  return { expenses: expenses || [], setExpenses, loading, error }
}

interface useAddExpenseProps {
  groupId?: string
  setExpenses: React.Dispatch<React.SetStateAction<(Expense & { optimistic?: boolean })[] | undefined>>
}

export const useAddExpense = ({ groupId, setExpenses }: useAddExpenseProps) => {
  const addExpense = useCallback(
    async (expense: ExpenseDraft) => {
      if (!groupId) return

      const expenseUiId = generateId()
      setExpenses((prev) => [...(prev ?? []), { ...expense, id: expenseUiId, optimistic: true }])

      try {
        const response = await fetch(`/api/groups/${groupId}/expenses`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(expense),
        })

        if (!response.ok) {
          throw new CustomError(response.status)
        }

        const data = await response.json()

        setExpenses((prevExpenses) =>
          prevExpenses?.map((expense) =>
            expense.id === expenseUiId ? { ...expense, optimistic: false, id: data.expense } : expense,
          ),
        )
      } catch {
        // TODO: Put it in red with a warning, a tooltip and a try again button
      }
    },
    [groupId, setExpenses],
  )

  return { addExpense }
}

interface useRemoveExpenseProps {
  setExpenses: React.Dispatch<React.SetStateAction<(Expense & { optimistic?: boolean })[] | undefined>>
}

export const useRemoveExpense = ({ setExpenses }: useRemoveExpenseProps) => {
  const removeExpense = useCallback(
    async (id: string) => {
      setExpenses((prevExpenses) => prevExpenses?.filter(({ id: expenseId }) => expenseId !== id))

      try {
        const response = await fetch(`/api/expenses/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok) {
          throw new CustomError(response.status)
        }
      } catch {
        // TODO: Put it again in red with a warning, a tooltip and a try again button
      }
    },
    [setExpenses],
  )

  return { removeExpense }
}

interface useAddExpenseProps {
  setExpenses: React.Dispatch<React.SetStateAction<(Expense & { optimistic?: boolean })[] | undefined>>
}

export const useEditExpense = ({ setExpenses }: useAddExpenseProps) => {
  const editExpense = useCallback(
    async ({ id, name, amount, title, date, sharedWith }: Expense) => {
      const values = { name, amount, title, date, sharedWith }

      setExpenses((prevExpenses) =>
        prevExpenses?.map((expense) => (expense.id === id ? { ...values, id, optimistic: true } : expense)),
      )

      try {
        const response = await fetch(`/api/expenses/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        })

        if (!response.ok) {
          throw new CustomError(response.status)
        }

        setExpenses((prevExpenses) =>
          prevExpenses?.map((expense) => (expense.id === id ? { ...expense, optimistic: false, id } : expense)),
        )
      } catch {
        // Put in red with a warning, a tooltip and a try again button
      }
    },
    [setExpenses],
  )

  return { editExpense }
}

interface useRemoveParticipantProps {
  expenses: Expense[]
  removeExpense: (id: string) => Promise<void>
  editExpense: (expense: Expense) => Promise<void>
}

export const useRemoveParticipant = ({ expenses, removeExpense, editExpense }: useRemoveParticipantProps) => {
  const removeParticipant = useCallback(
    async (participant: string) => {
      await Promise.all(
        expenses.map((expense) => {
          if (expense.name === participant) return removeExpense(expense.id)

          if (!expense.sharedWith?.includes(participant)) return undefined

          const remainingSharers = expense.sharedWith.filter((sharer) => sharer !== participant)

          return editExpense({ ...expense, sharedWith: remainingSharers.length ? remainingSharers : [expense.name] })
        }),
      )
    },
    [editExpense, expenses, removeExpense],
  )

  return { removeParticipant }
}
