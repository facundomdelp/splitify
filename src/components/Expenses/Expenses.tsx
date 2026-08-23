import { useTranslations } from 'next-intl'

import { Expense as ExpenseType } from '@/types/expense-types'

import Amount from '@/components/Amount'
import ChangeEmojisButton from '@/components/ChangeEmojisButton'
import Expense from '@/components/Expense'
import ManageExpense from '@/components/ManageExpense'
import RemoveExpense from '@/components/RemoveExpense'
import Spinner from '@/components/ui/spinner'

import { getPartialSharers } from '@/utils/functions/getParticipants'

import { UsersRound } from 'lucide-react'

interface Props {
  expenses: ExpenseType[]
  participants: string[]
  onRemoveExpense: (id: string) => void
  onEditExpense?: (expense: ExpenseType) => void
  loading?: boolean
}

const Expenses = ({ expenses, participants, onRemoveExpense, onEditExpense, loading }: Props) => {
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
                sharers={getPartialSharers(expense, participants)}
                action={
                  !onEditExpense ? (
                    <RemoveExpense id={expense.id} name={expense.name} onRemoveExpense={onRemoveExpense} />
                  ) : (
                    <ManageExpense
                      expense={expense}
                      participants={participants}
                      onRemoveExpense={onRemoveExpense}
                      onEditExpense={onEditExpense}
                    />
                  )
                }
              />
            ))}
            <li className='mt-auto flex justify-between py-3 font-semibold'>
              <p>TOTAL</p>
              <p>
                <Amount>{expenses.reduce((acc, cv) => acc + cv.amount, 0)}</Amount>
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
