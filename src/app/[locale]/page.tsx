'use client'

import { useTranslations } from 'next-intl'
import { useSetExpenses } from '@/store/expenses.store'
import { useSetBalances } from '@/store/balances.store'
import { useAddExpense, useConvertIntoGroup } from './hooks'
import ExpensesSection from '@/components/ExpensesSection'
import BalancesSection from '@/components/BalancesSection'
import Spinner from '@/components/ui/spinner'
import ExpensesBalancesTabs from '@/components/ExpensesBalancesTabs'
import { useCalculateBalances } from '@/lib/hooks/useCalculateBalances'
import { useState } from 'react'
import HomeContextMenu from './_components/HomeContextMenu'

export default function Home() {
  const [expenses, setExpenses] = useSetExpenses()
  const [balances, setBalances] = useSetBalances()

  const [rounded, setRounded] = useState(false)

  const { addExpense } = useAddExpense({ expenses, setExpenses })
  const { handleCalculateBalances, disabledBalances } = useCalculateBalances({
    expenses,
    balances,
    setBalances,
    setRounded,
  })
  const { convertIntoGroup, convertToGroupState } = useConvertIntoGroup({ setExpenses, setBalances })

  const t = useTranslations('Home')

  return (
    <main className='w-full my-8 text-dark max-w-[600px] space-y-6 flex flex-col'>
      <div className='flex justify-center items-center gap-2 relative'>
        {/* SEO */}
        <article className='hidden'>
          <h1>{t('🤑 Splitify | Simplify your group expenses with Splitify')}</h1>
          <p>{t('Splitify is the ultimate tool to divide expenses with friends, family, and colleagues')}</p>
        </article>
        {/* SEO */}

        <h2 className='text-lg font-bold flex flex-nowrap gap-2 justify-center text-green-800' id='expenses'>
          ⚡{'Spliti Ya'}
        </h2>
        <div className='absolute right-2'>
          {!convertToGroupState.loading ? (
            <HomeContextMenu
              expenses={expenses}
              setExpenses={setExpenses}
              setBalances={setBalances}
              convertIntoGroup={convertIntoGroup}
            />
          ) : (
            <Spinner className='w-fit px-4 text-green-600' />
          )}
        </div>
      </div>

      <ExpensesBalancesTabs
        onBalancesClick={handleCalculateBalances}
        disabled={convertToGroupState.loading}
        disabledBalances={disabledBalances}
      >
        {[
          <ExpensesSection
            key='expenses-section'
            expenses={expenses}
            setExpenses={setExpenses}
            addExpenseAction={addExpense}
            disabled={convertToGroupState.loading}
          />,
          <BalancesSection key='balances-section' balances={balances} rounded={rounded} setRounded={setRounded} />,
        ]}
      </ExpensesBalancesTabs>
    </main>
  )
}
