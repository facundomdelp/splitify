'use client'

import ExpensesForm from './_components/Expenses/ExpensesForm'
import { Expenses } from './_components/Expenses/Expenses'
import { useTranslations } from 'next-intl'
import { useSetExpenses } from '@/components/store/expenses'
import { Button } from '@/components/ui/button'
import { Undo } from 'lucide-react'
import { useState } from 'react'
import CalculateButton from './_components/Expenses/CalculateButton'
import { useSetBalances } from '@/components/store/balances'
import Balances from './_components/Balances'
import { ResetBalances } from './_components/Balances/ResetBalances'
import CopyToClipboard from '@/components/CopyToClipboard'
import { useCalculateBalances, useCopyString } from './hooks'

export default function Home() {
  const [expenses, setExpenses] = useSetExpenses()
  const [balances, setBalances] = useSetBalances()

  const [rounded, setRounded] = useState(balances.some((balance) => balance.amount % 1 === 0))

  const { handleCalculateBalances, calculating } = useCalculateBalances({ expenses, setBalances })
  const copyString = useCopyString({ balances, rounded })

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

      {balances.length === 0 ? (
        <ExpensesForm expenses={expenses} setExpenses={setExpenses} />
      ) : (
        <section className='h-[64px] flex items-center'>
          <Button className='w-full gap-4' type='submit' variant='outline' onClick={() => setBalances([])}>
            <Undo />
            {t('Continue Editing')}
          </Button>
        </section>
      )}

      <Expenses expenses={expenses} setExpenses={setExpenses} readOnly={balances.length > 0} />
      {balances.length > 0 && (
        <Balances balances={balances} setBalances={setBalances} rounded={rounded} setRounded={setRounded} />
      )}

      {balances.length === 0 ? (
        <CalculateButton
          expenses={expenses}
          calculating={calculating}
          handleCalculateBalances={handleCalculateBalances}
        />
      ) : (
        <>
          <section className='mt-auto flex gap-4'>
            <ResetBalances setBalances={setBalances} onClean={onClean} className='flex-1 basis-28' />
            <CopyToClipboard copyString={copyString} />
          </section>
        </>
      )}
    </main>
  )
}
