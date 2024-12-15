'use client'

import ExpensesForm from './_components/Expenses/ExpensesForm'
import { calculateBalances } from '@/lib/functions/calculateBalances'
import { Expenses } from './_components/Expenses/Expenses'
import { useTranslations } from 'next-intl'
import { useSetExpenses } from '@/components/store/expenses'
import { Button } from '@/components/ui/button'
import { Undo } from 'lucide-react'
import { useState } from 'react'
import CalculateButton from './_components/Expenses/CalculateButton'
import { useSetBalances } from '@/components/store/balances'
import Balances from './_components/Balances'

export default function Home() {
  const [expenses, setExpenses] = useSetExpenses()
  const [balances, setBalances] = useSetBalances()
  const [calculating, setCalculating] = useState(false)

  const handleCalculateBalances = () => {
    if (!expenses) return

    setCalculating(true)
    setTimeout(() => {
      setBalances(calculateBalances(expenses))
      setCalculating(false)

      setTimeout(() => {
        const targetElement = document.querySelector('#balances')
        if (targetElement) {
          const { top } = targetElement.getBoundingClientRect()
          scrollTo({ top: top, behavior: 'smooth' })
        }
      }, 300)
    }, 1000)
  }

  const onClean = () => {
    setExpenses([])
  }

  const t = useTranslations('Home')

  return (
    <main className='my-8 mx-4 flex flex-col gap-8 max-w-[600px] text-gray-600 flex-1 min-w-0 cursor-default'>
      {/* SEO */}
      <article className='hidden'>
        <h1>{t('🤑 Splitify | Simplify your group expenses with Splitify')}</h1>
        <p>{t('Splitify is the ultimate tool to divide expenses with friends, family, and colleagues')}</p>
      </article>
      {/* SEO */}

      {!balances || !balances.length ? (
        <ExpensesForm expenses={expenses} setExpenses={setExpenses} />
      ) : (
        <Button className='flex gap-4' type='submit' variant='outline' onClick={() => setBalances([])}>
          <Undo />
          {t('Continue Editing')}
        </Button>
      )}

      <Expenses expenses={expenses} setExpenses={setExpenses} readOnly={balances.length > 0} />

      {balances.length === 0 ? (
        <CalculateButton
          expenses={expenses}
          calculating={calculating}
          handleCalculateBalances={handleCalculateBalances}
        />
      ) : (
        <Balances balances={balances} setBalances={setBalances} onClean={onClean} />
      )}
    </main>
  )
}
