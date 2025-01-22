import { Expense } from '@/types/expense.types'
import { formatAmount } from '@/lib/functions/formatAmount'
import { UsersRound } from 'lucide-react'
import { useGetEmojiFromString } from '@/lib/hooks/useGetEmojiFromString'
import { useTranslations } from 'next-intl'
import ChangeEmojisButton from '@/components/ChangeEmojisButton'
import { RemoveExpense } from './RemoveExpense'
import { cn } from '@/lib/utils'
import Spinner from '../ui/spinner'
import { formatDate } from '@/lib/functions/formatDate'

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
      <section className='text-sm flex flex-col min-w-0 flex-1'>
        <div className='flex items-center'>
          <h2 className='text-lg font-bold flex flex-nowrap gap-2 items-center' id='expenses'>
            <UsersRound className='size-[22px] text-green-700' />
            {t('Expenses')}
          </h2>
          {expenses && expenses.length > 0 && <ChangeEmojisButton />}
        </div>

        {loading ? (
          <p className='m-auto text-gray-500 text-center'>
            <Spinner className='text-green-600' />
          </p>
        ) : expenses && Object.keys(expenses).length ? (
          <ul className='mt-4 flex flex-col gap-3 min-w-0'>
            {expenses.toReversed().map(({ id, optimistic, name, amount, title, date }, index) => {
              return (
                <li key={index} className={cn('flex items-center min-w-0', optimistic ? 'text-gray-400' : '')}>
                  <p className='mr-2 w-[20px] text-center'>{getEmojiFromString(name)}</p>
                  <div className='flex flex-col min-w-0'>
                    <div className='flex items-center min-w-0'>
                      <p className='text-ellipsis whitespace-nowrap overflow-hidden min-w-0'>{name}</p>
                      <p className='whitespace-nowrap'>: ${formatAmount(amount)}</p>
                      {!readOnly && !optimistic && (
                        <RemoveExpense id={id} name={name} onRemoveExpense={onRemoveExpense} />
                      )}
                    </div>
                    {(title || date) && (
                      <div className='flex items-center min-w-0 gap-1 text-gray-500 text-xs'>
                        {date && <p>{formatDate(date)}</p>}
                        {title && date && <p>-</p>}
                        <p className='text-ellipsis whitespace-nowrap overflow-hidden min-w-0'>{title}</p>
                      </div>
                    )}
                  </div>
                </li>
              )
            })}
            <li className='mt-auto flex justify-between font-semibold py-3'>
              <p>TOTAL</p>
              <p>$ {formatAmount(expenses.reduce((acc, cv) => acc + cv.amount, 0))}</p>
            </li>
          </ul>
        ) : (
          <p className='m-auto text-gray-500 text-center'>🤑 {t('Enter an Expense to get started!')} 💸</p>
        )}
      </section>
    </>
  )
}
