'use client'

import Transfers from './_components/Transfers'
import ExpensesForm from './_components/Expenses/ExpensesForm'
import { calculateTransfers } from '@/lib/functions/calculateTransfers'
import { Expenses } from './_components/Expenses/Expenses'
import { useTranslations } from 'next-intl'
import { useGetExpenses } from '@/components/store/expenses'
import { useGetTransfers } from '@/components/store/transfers'

export default function Home() {
  const [expenses, setExpenses] = useGetExpenses()
  const [transfers, setTransfers] = useGetTransfers()

  const handleCalculateTransfers = () => {
    setTransfers(calculateTransfers(expenses))
  }

  const onClean = () => {
    setExpenses([])
  }

  const t = useTranslations('Home')

  return (
    <main className='my-8 mx-4 flex flex-col gap-8 max-w-[600px] text-gray-600 flex-1 min-w-0 cursor-default'>
      <h1 className='hidden'>{t('🤑 Splitify | Simplify your group expenses with Splitify')}</h1>

      <ExpensesForm
        expenses={expenses}
        setExpenses={setExpenses}
        disabled={transfers.length > 0}
        onReturn={transfers.length > 0 ? () => setTransfers([]) : undefined}
      />

      {!transfers.length ? (
        <Expenses expenses={expenses} setExpenses={setExpenses} handleCalculateTransfers={handleCalculateTransfers} />
      ) : (
        <Transfers transfers={transfers} setTransfers={setTransfers} onClean={onClean} />
      )}
    </main>
  )
}
