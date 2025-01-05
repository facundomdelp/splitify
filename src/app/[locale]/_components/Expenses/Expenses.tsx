import { Expense } from '@/types/expense.types'
import { formatAmount } from '@/lib/functions/formatAmount'
import { RemoveExpense } from './RemoveExpense'
import { UsersRound } from 'lucide-react'
import { useGetEmojiFromString } from '@/lib/hooks/useGetEmojiFromString'
import { useTranslations } from 'next-intl'
import ChangeEmojisButton from '@/components/ChangeEmojisButton'

interface Props {
  expenses: Expense[]
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
  readOnly?: boolean
}

export const Expenses = ({ expenses, setExpenses, readOnly = false }: Props) => {
  const getEmojiFromString = useGetEmojiFromString()

  const t = useTranslations('Expenses')

  return (
    <>
      <section className='mx-4 text-sm flex flex-col min-w-0 flex-1'>
        <div className='flex items-center'>
          <h2 className='text-lg font-bold flex flex-nowrap gap-2 items-center' id='expenses'>
            <UsersRound className='size-[22px] text-green-700' />
            {t('Expenses')}
          </h2>
          {expenses && expenses.length > 0 && <ChangeEmojisButton />}
        </div>

        {expenses && Object.keys(expenses).length ? (
          <ul className='mt-4 flex flex-col gap-3 min-w-0'>
            {expenses.toReversed().map(({ id, name, amount }, index) => (
              <li key={index} className='flex items-center min-w-0'>
                <p className='mr-2 w-[20px] text-center'>{getEmojiFromString(name)}</p>
                <p className='text-ellipsis whitespace-nowrap overflow-hidden min-w-0'>{name}</p>
                <p className='whitespace-nowrap'>: ${formatAmount(amount)}</p>
                {!readOnly && (
                  <RemoveExpense id={id} name={name} expenses={expenses} setExpenses={setExpenses} className='mx-1' />
                )}
              </li>
            ))}
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
