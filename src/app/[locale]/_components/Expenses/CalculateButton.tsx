import { Button } from '@/components/ui/button'
import Spinner from '@/components/ui/spinner'
import { Expense } from '@/types/Expense'
import { useTranslations } from 'next-intl'
import React from 'react'

interface Props {
  expenses: Expense[]
  calculating: boolean
  handleCalculateBalances: () => void
}

const CalculateButton = ({ expenses, calculating, handleCalculateBalances }: Props) => {
  const t = useTranslations('CalculateButton')

  return (
    <section className='mt-auto flex'>
      <Button
        className='flex-1'
        onClick={handleCalculateBalances}
        disabled={
          calculating ||
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
        }
      >
        {!calculating ? t('Calculate Balances') : <Spinner />}
      </Button>
    </section>
  )
}

export default CalculateButton
