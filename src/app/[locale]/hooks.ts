import { calculateBalances } from '@/lib/functions/calculateBalances'
import { formatAmount } from '@/lib/functions/formatAmount'
import { useGetEmojiFromString } from '@/lib/hooks/useGetEmojiFromString'
import { Balance } from '@/types/Balance'
import { Expense } from '@/types/Expense'
import { useMemo, useState } from 'react'

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

interface useCopyStringProps {
  balances: Balance[]
  rounded: boolean
}

export const useCopyString = ({ balances, rounded }: useCopyStringProps) => {
  const getEmojiFromString = useGetEmojiFromString()

  return useMemo(
    () =>
      [
        ...balances.map(
          (balance) =>
            `${getEmojiFromString(balance.debtor)} ${balance.debtor} debe $${formatAmount(balance.amount, rounded ? 0 : 2)} a ${getEmojiFromString(balance.creditor)} ${balance.creditor}`,
        ),
        '\nhttps://splitify.me',
      ].join('\n'),
    [getEmojiFromString, rounded, balances],
  )
}
