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

import { X } from 'lucide-react'

import { useAddExpense, useConvertIntoGroup, useHideTitleBanner, useRemoveExpense } from './hooks'

export default function Home() {
  const [expenses, setExpenses] = useSetExpenses()
  const [balances, setBalances] = useSetBalances()
  const [rounded, setRounded] = useState(false)

  const { hideTitleBanner, handleCloseTitle } = useHideTitleBanner()

  const { addExpense } = useAddExpense({ setExpenses })
  const { removeExpense } = useRemoveExpense({ setExpenses })

  const { handleCalculateBalances, disabledBalances } = useCalculateBalances({
    expenses,
    balances,
    setBalances,
    setRounded,
  })
  const { convertIntoGroup, convertToGroupState } = useConvertIntoGroup({ setExpenses, setBalances })

  const handleResetExpenses = () => {
    setExpenses([])
    setBalances([])
  }

  const t = useTranslations('Home')

  return (
    <main className='text-dark relative my-6 flex w-full max-w-[600px] flex-col space-y-6'>
      {!hideTitleBanner && (
        <article className='relative mx-4 rounded-md border border-green-600 bg-green-50 p-3'>
          <X
            className='absolute right-2 top-2 size-[18px] cursor-pointer text-gray-500 hover:text-gray-700'
            onClick={handleCloseTitle}
          />
          <h1 className='mb-1 mr-5 mt-0 text-sm font-bold'>{t('Simplify your group expenses with Splitify 🤑')}</h1>
          <p className='text-xs text-slate-500'>
            <strong className='font-semibold'>{t('💸 How does it work?')}</strong>{' '}
            {t("Just enter each participant's name and how much they spent")}
          </p>
        </article>
      )}

      <ExpensesBalancesTabs
        onBalancesClick={handleCalculateBalances}
        disabled={convertToGroupState.loading}
        disabledBalances={disabledBalances}
        onResetExpenses={handleResetExpenses}
        contextMenu={
          !convertToGroupState.loading ? (
            <HomeContextMenu
              expenses={expenses}
              setExpenses={setExpenses}
              setBalances={setBalances}
              convertIntoGroup={convertIntoGroup}
            />
          ) : (
            <Spinner className='w-fit px-4 text-green-600' />
          )
        }
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
