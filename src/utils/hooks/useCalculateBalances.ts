import { useMemo } from 'react'

import { Balance } from '@/types/balance-types'
import { Expense } from '@/types/expense-types'

import { calculateBalances } from '../functions/calculateBalances'

interface useCalculateBalancesProps {
  expenses: Expense[]
  balances: Balance[]
  setBalances: React.Dispatch<React.SetStateAction<Balance[]>>
  setRounded?: React.Dispatch<React.SetStateAction<boolean>>
}

export const useCalculateBalances = ({ expenses, balances, setBalances, setRounded }: useCalculateBalancesProps) => {
  const handleCalculateBalances = () => {
    if (!expenses) return

    setBalances(calculateBalances(expenses))
    setRounded?.(balances.some((balance) => balance.amount % 1 === 0))
  }

  const disabledBalances = useMemo(() => {
    return (
      !expenses ||
      new Set(expenses.map(({ name }) => name)).size < 2 ||
      new Set(
        Object.values(
          expenses.reduce<Record<string, number>>(
            (acc, { amount, name }) => ({ ...acc, [name]: (acc[name] ? acc[name] : 0) + amount }),
            {},
          ),
        ),
      ).size === 1 ||
      expenses.reduce((acc, { amount }) => amount + acc, 0) === 0
    )
  }, [expenses])

  return { handleCalculateBalances, disabledBalances }
}
