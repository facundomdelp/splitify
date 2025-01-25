'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import HomeContextMenu from './_components/HomeContextMenu'
import BalancesSection from '@/components/BalancesSection'
import ExpensesBalancesTabs from '@/components/ExpensesBalancesTabs'
import ExpensesSection from '@/components/ExpensesSection'
import Spinner from '@/components/ui/spinner'

import { useSetBalances } from '@/store/balances-store'
import { useSetExpenses } from '@/store/expenses-store'

import { useCalculateBalances } from '@/utils/hooks/useCalculateBalances'

import { useAddExpense, useConvertIntoGroup, useRemoveExpense } from './hooks'

export default function Home() {
  const [expenses, setExpenses] = useSetExpenses()
  const [balances, setBalances] = useSetBalances()

  const [rounded, setRounded] = useState(false)

  const { addExpense } = useAddExpense({ setExpenses })
  const { removeExpense } = useRemoveExpense({ expenses, setExpenses })

  const { handleCalculateBalances, disabledBalances } = useCalculateBalances({
    expenses,
    balances,
    setBalances,
    setRounded,
  })
  const { convertIntoGroup, convertToGroupState } = useConvertIntoGroup({ setExpenses, setBalances })

  const t = useTranslations('Home')

  return (
    <main className='text-dark relative my-6 flex w-full max-w-[600px] flex-col space-y-6'>
      <div className='-mt-6 flex items-center justify-center gap-2'>
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
