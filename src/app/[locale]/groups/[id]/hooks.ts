import { CustomError } from '@/lib/errors/CustomErrors'
import { calculateBalances } from '@/lib/functions/calculateBalances'
import { useSetGroups } from '@/store/groups.store'
import { Balance } from '@/types/balance.types'
import { Expense } from '@/types/expense.types'
import { GetGroupResponse } from '@/types/group.types'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

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

interface useCalculateGroupBalancesProps {
  expenses: Expense[]
  balances: Balance[]
  setBalances: React.Dispatch<React.SetStateAction<Balance[]>>
  setRounded: React.Dispatch<React.SetStateAction<boolean>>
}

export const useCalculateGroupBalances = ({
  expenses,
  balances,
  setBalances,
  setRounded,
}: useCalculateGroupBalancesProps) => {
  const handleCalculateGroupBalances = () => {
    if (!expenses) return

    setBalances(calculateBalances(expenses))
    setRounded(balances.some((balance) => balance.amount % 1 === 0))
  }

  return { handleCalculateGroupBalances }
}
