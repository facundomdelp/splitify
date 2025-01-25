import { useTranslations } from 'next-intl'

import { Expense } from '@/types/expense.types'

import { cn } from '@/lib/utils'

import ChangeEmojisButton from '@/components/ChangeEmojisButton'

import { formatAmount } from '@/utils/functions/formatAmount'
import { formatTimestampToDate } from '@/utils/functions/formatDate'
import { useGetEmojiFromString } from '@/utils/hooks/useGetEmojiFromString'

import { UsersRound } from 'lucide-react'

import Spinner from '../ui/spinner'
import { RemoveExpense } from './RemoveExpense'

interface Props {
  expenses: Expense[]
  onRemoveExpense: (id: string) => void
  readOnly?: boolean
  loading?: boolean
}

export const Expenses = ({ expenses, onRemoveExpense, readOnly = false, loading }: Props) => {
  const getEmojiFromString = useGetEmojiFromString()

  const t = useTranslations('Expenses')

  return (
    <>
      <section className='flex min-w-0 flex-1 flex-col text-sm'>
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
            {expenses.toReversed().map(({ id, optimistic, name, amount, title, date }, index) => {
              return (
                <li key={index} className={cn('flex min-w-0 items-center', optimistic ? 'text-gray-400' : '')}>
                  <p className='mr-2 w-[20px] text-center'>{getEmojiFromString(name)}</p>
                  <div className='flex min-w-0 flex-col'>
                    <div className='flex min-w-0 items-center'>
                      <p className='min-w-0 overflow-hidden text-ellipsis whitespace-nowrap'>{name}</p>
                      <p className='whitespace-nowrap'>: ${formatAmount(amount)}</p>
                      {!readOnly && !optimistic && (
                        <RemoveExpense id={id} name={name} onRemoveExpense={onRemoveExpense} />
                      )}
                    </div>
                    {(title || date) && (
                      <div className='flex min-w-0 items-center gap-1 text-xs text-gray-500'>
                        {date && <p>{formatTimestampToDate(date)}</p>}
                        {title && date && <p>-</p>}
                        <p className='min-w-0 overflow-hidden text-ellipsis whitespace-nowrap'>{title}</p>
                      </div>
                    )}
                  </div>
                </li>
              )
            })}
            <li className='mt-auto flex justify-between py-3 font-semibold'>
              <p>TOTAL</p>
              <p>$ {formatAmount(expenses.reduce((acc, cv) => acc + cv.amount, 0))}</p>
            </li>
          </ul>
        ) : (
          <p className='m-auto text-center text-gray-500'>🤑 {t('Enter an Expense to get started!')} 💸</p>
        )}
      </section>
    </>
  )
}
