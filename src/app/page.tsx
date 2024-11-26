'use client'

import Transfers from './_components/Transfers'
import ExpensesForm from './_components/Expenses/ExpensesForm'
import { Expense, Transfer } from '@/types'
import { calculateTransfers } from '@/lib/functions/calculateTransfers'
import { useLocalStorage } from '@/lib/hooks/useLocalStorage'
import { Expenses } from './_components/Expenses/Expenses'

export default function Home() {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>('expenses', [])
  const [transfers, setTransfers] = useLocalStorage<Transfer[]>('transfers', [])

  const handleCalculateTransfers = () => {
    setTransfers(calculateTransfers(expenses))
  }

  const onClean = () => {
    setExpenses([])
  }

  return (
    <main className='my-8 mx-4 flex flex-col gap-8 max-w-[600px] text-gray-600 flex-1 min-w-0 cursor-default'>
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
