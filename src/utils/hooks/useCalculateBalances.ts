import { useMemo } from 'react'

import { calculateBalances } from '@/core/calculateBalances'

import { Balance } from '@/types/balance-types'
import { Expense } from '@/types/expense-types'

interface useCalculateBalancesProps {
  expenses: Expense[]
  balances: Balance[]
  setBalances: React.Dispatch<React.SetStateAction<Balance[]>>
  setRounded?: React.Dispatch<React.SetStateAction<boolean>>
}

export const useCalculateBalances = ({ expenses, balances, setBalances, setRounded }: useCalculateBalancesProps) => {
  const calculatedBalances = useMemo(() => calculateBalances(expenses ?? []), [expenses])

  const handleCalculateBalances = () => {
    setBalances(calculatedBalances)
    setRounded?.(balances.some((balance) => balance.amount % 1 === 0))
  }

  return { handleCalculateBalances, disabledBalances: calculatedBalances.length === 0 }
}
