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

  const { addExpense } = useAddExpense({ setExpenses })

  const removeExpense = async (id: string) => {
    const remainingExpenses = expenses.filter(({ id: expenseId }) => expenseId !== id)
    setExpenses(remainingExpenses)
  }

  const { handleCalculateBalances, disabledBalances } = useCalculateBalances({
    expenses,
    balances,
    setBalances,
    setRounded,
  })
  const { convertIntoGroup, convertToGroupState } = useConvertIntoGroup({ setExpenses, setBalances })

  const t = useTranslations('Home')

  return (
    <main className='w-full my-6 text-dark max-w-[600px] space-y-6 flex flex-col relative'>
      <div className='flex justify-center items-center gap-2 -mt-6'>
        {/* SEO */}
        <article className='hidden'>
          <h1>{t('🤑 Splitify | Simplify your group expenses with Splitify')}</h1>
          <p>{t('Splitify is the ultimate tool to divide expenses with friends, family, and colleagues')}</p>
        </article>
        {/* SEO */}

        {/* If this is uncommented, then we should remove both -mt-6 and -top-6 from this page */}
        {/*  <h2 className='text-lg font-bold flex flex-nowrap gap-2 justify-center text-green-800' id='expenses'>
          ⚡{t('Spliti Quick')}
        </h2> */}
      </div>

      <div className='absolute -top-6 right-2 z-10 -mt-6'>
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

      <ExpensesBalancesTabs
        onBalancesClick={handleCalculateBalances}
        disabled={convertToGroupState.loading}
        disabledBalances={disabledBalances}
      >
        {[
          <ExpensesSection
            key='expenses-section'
            expenses={expenses}
            removeExpense={removeExpense}
            addExpense={addExpense}
            disabled={convertToGroupState.loading}
          />,
          <BalancesSection key='balances-section' balances={balances} rounded={rounded} setRounded={setRounded} />,
        ]}
      </ExpensesBalancesTabs>
    </main>
  )
}
