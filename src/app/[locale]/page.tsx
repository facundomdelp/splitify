'use client'

import Transfers from './_components/Transfers'
import ExpensesForm from './_components/Expenses/ExpensesForm'
import { calculateTransfers } from '@/lib/functions/calculateTransfers'
import { Expenses } from './_components/Expenses/Expenses'
import { useTranslations } from 'next-intl'
import { useSetExpenses } from '@/components/store/expenses'
import { useSetTransfers } from '@/components/store/transfers'

export default function Home() {
  const [expenses, setExpenses] = useSetExpenses()
  const [transfers, setTransfers] = useSetTransfers()

  const handleCalculateTransfers = () => {
    if (!expenses) return

    setTransfers(calculateTransfers(expenses))
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

      <ExpensesForm
        expenses={expenses}
        setExpenses={setExpenses}
        disabled={transfers.length > 0}
        onReturn={transfers.length > 0 ? () => setTransfers([]) : undefined}
      />

      {!transfers || !transfers.length ? (
        <Expenses expenses={expenses} setExpenses={setExpenses} handleCalculateTransfers={handleCalculateTransfers} />
      ) : (
        <Transfers transfers={transfers} setTransfers={setTransfers} onClean={onClean} />
      )}
    </main>
  )
}
