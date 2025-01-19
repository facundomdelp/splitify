import { calculateBalances } from '@/lib/functions/calculateBalances'
import { Balance } from '@/types/balance.types'
import { Expense } from '@/types/expense.types'
import React, { useState } from 'react'

interface useCalculateBalancesProps {
  expenses: Expense[]
  setBalances: React.Dispatch<React.SetStateAction<Balance[]>>
}

export const useCalculateBalances = ({ expenses, setBalances }: useCalculateBalancesProps) => {
  const handleCalculateBalances = () => {
    if (!expenses) return

    setBalances(calculateBalances(expenses))
  }

  return { handleCalculateBalances }
}

interface useRoundBalancesProps {
  balances: Balance[]
}

export const useRoundBalances = ({ balances }: useRoundBalancesProps) => {
  const [rounded, setRounded] = useState(balances.some((balance) => balance.amount % 1 === 0))

  return { rounded, setRounded }
}
