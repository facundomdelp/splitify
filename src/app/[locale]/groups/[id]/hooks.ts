import React, { useCallback, useEffect, useState } from 'react'

import { useParams } from 'next/navigation'

import { Expense, GetGroupExpensesResponse } from '@/types/expense-types'
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
  const [expenses, setExpenses] = useState<Expense[]>([])
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

      const data: GetGroupExpensesResponse = await response.json()
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
    if (expenses.length === 0) {
      getGroupExpenses()
    }
  }, [expenses.length, getGroupExpenses])

  return { expenses, setExpenses, loading, error }
}

interface useAddExpenseProps {
  groupId?: string
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
}

export const useAddExpense = ({ groupId, setExpenses }: useAddExpenseProps) => {
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
    if (!groupId) return

    const expenseUiId = generateId()
    setExpenses((prev) => [...(prev ?? []), { id: expenseUiId, optimistic: true, name, amount, title, date }])

    try {
      const response = await fetch(`/api/groups/${groupId}/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          amount,
          title,
          date,
        }),
      })

      if (!response.ok) {
        throw new CustomError(response.status)
      }

      const data = await response.json()

      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === expenseUiId ? { ...expense, optimistic: false, id: data.expense } : expense,
        ),
      )
    } catch {
      // Put in red with a warning, a tooltip and a try again button
    }
  }

  return { addExpense }
}

interface useRemoveExpenseProps {
  expenses: Expense[]
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
}

export const useRemoveExpense = ({ expenses, setExpenses }: useRemoveExpenseProps) => {
  const removeExpense = async (id: string) => {
    const remainingExpenses = expenses.filter(({ id: expenseId }) => expenseId !== id)
    setExpenses(remainingExpenses)

    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        throw new CustomError(response.status)
      }
    } catch {
      // use an optimistic removing
    }
  }

  return { removeExpense }
}
