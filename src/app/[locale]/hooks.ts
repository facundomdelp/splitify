import { calculateBalances } from '@/lib/functions/calculateBalances'
import { Balance } from '@/types/balance.types'
import { Expense } from '@/types/expense.types'
import React, { useState } from 'react'

interface useCalculateBalancesProps {
  expenses: Expense[]
  setBalances: React.Dispatch<React.SetStateAction<Balance[]>>
}

export const useCalculateBalances = ({ expenses, setBalances }: useCalculateBalancesProps) => {
  const [calculating, setCalculating] = useState(false)

  const handleCalculateBalances = () => {
    if (!expenses) return

    setCalculating(true)
    setTimeout(() => {
      setBalances(calculateBalances(expenses))
      setCalculating(false)

      setTimeout(() => {
        const targetElement = document.querySelector('#balances')
        const header = document.querySelector('#header')

        if (targetElement && header) {
          const { top: balancesTop } = targetElement.getBoundingClientRect()
          const { height: headerHeight } = header?.getBoundingClientRect()

          scrollTo({ top: balancesTop + headerHeight, behavior: 'smooth' })
        }
      }, 300)
    }, 1000)
  }

  return { handleCalculateBalances, calculating }
}

interface useRoundBalancesProps {
  balances: Balance[]
}

export const useRoundBalances = ({ balances }: useRoundBalancesProps) => {
  const [rounded, setRounded] = useState(balances.some((balance) => balance.amount % 1 === 0))

  return { rounded, setRounded }
}
