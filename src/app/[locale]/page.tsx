'use client'

import { Expenses } from './_components/Expenses/Expenses'
import { useTranslations } from 'next-intl'
import { useSetExpenses } from '@/store/expenses.store'
import { Button } from '@/components/ui/button'
import { Undo } from 'lucide-react'
import CalculateButton from './_components/Expenses/CalculateButton'
import { useSetBalances } from '@/store/balances.store'
import Balances from './_components/Balances'
import { useCalculateBalances } from './hooks'
import ExpensesForm from '@/components/ExpensesForm'

export default function Home() {
  const [expenses, setExpenses] = useSetExpenses()
  const [balances, setBalances] = useSetBalances()

  const { handleCalculateBalances, calculating } = useCalculateBalances({ expenses, setBalances })

  const onReset = () => setExpenses([])

  const t = useTranslations('Home')

  return (
    <main className='my-8 flex flex-col gap-8 max-w-[600px] text-gray-600 flex-1 min-w-0 cursor-default'>
      {/* SEO */}
      <article className='hidden'>
        <h1>{t('🤑 Splitify | Simplify your group expenses with Splitify')}</h1>
        <p>{t('Splitify is the ultimate tool to divide expenses with friends, family, and colleagues')}</p>
      </article>
      {/* SEO */}

      {balances.length === 0 ? (
        <ExpensesForm expenses={expenses} setExpenses={setExpenses} />
      ) : (
        <section className='mx-4 h-[64px] flex items-center'>
          <Button className='w-full gap-4' type='submit' variant='outline' onClick={() => setBalances([])}>
            <Undo />
            {t('Continue Editing')}
          </Button>
        </section>
      )}

      <Expenses expenses={expenses} setExpenses={setExpenses} readOnly={balances.length > 0} />

      {balances.length === 0 ? (
        <CalculateButton
          expenses={expenses}
          calculating={calculating}
          handleCalculateBalances={handleCalculateBalances}
        />
      ) : (
        <Balances balances={balances} onReset={onReset} setBalances={setBalances} />
      )}
    </main>
  )
}
