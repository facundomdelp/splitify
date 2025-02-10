import { useTranslations } from 'next-intl'

import { Expense as ExpenseType } from '@/types/expense-types'

import ChangeEmojisButton from '@/components/ChangeEmojisButton'

import { UsersRound } from 'lucide-react'

import Amount from '../Amount'
import Expense from '../Expense'
import RemoveExpense from '../RemoveExpense'
import Spinner from '../ui/spinner'

interface Props {
  expenses: ExpenseType[]
  onRemoveExpense: (id: string) => void
  loading?: boolean
}

const Expenses = ({ expenses, onRemoveExpense, loading }: Props) => {
  const t = useTranslations('Expenses')

  return (
    <>
      <section className='flex min-h-[300px] min-w-0 flex-1 flex-col text-sm'>
        <div className='flex items-center'>
          <h2 className='flex flex-nowrap items-center gap-2 text-lg font-bold' id='expenses'>
            <UsersRound className='size-[22px] text-green-700' />
            {t('Expenses')}
          </h2>
          {expenses && expenses.length > 0 && <ChangeEmojisButton />}
        </div>

        {loading ? (
          <p className='m-auto text-center text-gray-500'>
            <Spinner className='text-green-600' />
          </p>
        ) : expenses && Object.keys(expenses).length ? (
          <ul className='mt-4 flex min-w-0 flex-col gap-3'>
            {expenses.toReversed().map((expense) => (
              <Expense
                key={expense.id}
                {...expense}
                action={<RemoveExpense id={expense.id} name={expense.name} onRemoveExpense={onRemoveExpense} />}
              />
            ))}
            <li className='mt-auto flex justify-between py-3 font-semibold'>
              <p>TOTAL</p>
              <p>
                $ <Amount>{expenses.reduce((acc, cv) => acc + cv.amount, 0)}</Amount>
              </p>
            </li>
          </ul>
        ) : (
          <p className='m-auto text-center text-gray-500'>🤑 {t('Enter an Expense to get started!')} 💸</p>
        )}
      </section>
    </>
  )
}

export default Expenses
