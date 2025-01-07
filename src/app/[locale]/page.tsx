'use client'

import { useTranslations } from 'next-intl'
import { useSetExpenses } from '@/store/expenses.store'
import { Button } from '@/components/ui/button'
import { Undo } from 'lucide-react'
import CalculateButton from './_components/Expenses/CalculateButton'
import { useSetBalances } from '@/store/balances.store'
import { useCalculateBalances, useRoundBalances } from './hooks'
import ExpensesForm from '@/components/ExpensesForm'
import { Expenses } from '@/components/Expenses/Expenses'
import Balances from '@/components/Balances/Balances'
import { ResetBalances } from '@/components/Balances/ResetBalances'
import CopyToClipboard from '@/components/CopyToClipboard'
import { useCopyString } from '@/lib/hooks/useCopyString'
import { generateId } from '@/lib/functions/generateId'

export default function Home() {
  const [expenses, setExpenses] = useSetExpenses()
  const [balances, setBalances] = useSetBalances()

  const { handleCalculateBalances, calculating } = useCalculateBalances({ expenses, setBalances })
  const { rounded, setRounded } = useRoundBalances({ balances })
  const copyString = useCopyString({ balances, rounded })

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
        <ExpensesForm
          onSubmit={({ name, amount }) =>
            setExpenses([...(expenses ?? []), { id: generateId(), name: name.trim(), amount }])
          }
        />
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
        <>
          <Balances balances={balances} rounded={rounded} setRounded={setRounded} />

          <section className='mx-4 mt-auto flex gap-4'>
            <ResetBalances setBalances={setBalances} onReset={() => setExpenses([])} className='flex-1 basis-28' />
            <CopyToClipboard copyString={copyString} className='flex-1 basis-28' />
          </section>
        </>
      )}
    </main>
  )
}
