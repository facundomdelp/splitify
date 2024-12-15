import { Expense } from '@/types/Expense'
import { formatAmount } from '@/lib/functions/formatAmount'
import { RemoveExpense } from './RemoveExpense'
import { Button } from '@/components/ui/button'
import { RefreshCwIcon, UsersRound } from 'lucide-react'
import { useGetEmojiFromString } from '@/lib/hooks/useGetEmojiFromString'
import { useHandleChangeEmojis } from './hooks'
import { useTranslations } from 'next-intl'
import { useGetMetadata } from '@/components/store/metadata'

interface Props {
  expenses: Expense[]
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
  readOnly?: boolean
}

export const Expenses = ({ expenses, setExpenses, readOnly = false }: Props) => {
  const metadata = useGetMetadata()
  const { handleChangeEmojis, rotate } = useHandleChangeEmojis()
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
          {expenses && expenses.length > 0 && (
            <Button
              variant='outline'
              className='flex w-[65px] h-fit py-1 px-2 ml-auto justify-evenly'
              onClick={handleChangeEmojis}
              tabIndex={-1}
            >
              <RefreshCwIcon className={rotate ? 'rotate-180 transition-transform duration-500' : ''} />
              {metadata?.emojiHash === undefined ? '🤑' : getEmojiFromString('🐑')}
            </Button>
          )}
        </div>

        {expenses && Object.keys(expenses).length ? (
          <ul className='mt-4 flex flex-col gap-3 min-w-0'>
            {expenses.toReversed().map(({ id, name, amount }, index) => (
              <li key={index} className='flex items-center min-w-0'>
                <p className='mr-2'>{getEmojiFromString(name)}</p>
                <p className='text-ellipsis whitespace-nowrap overflow-hidden min-w-0'>{name}</p>
                <p className='whitespace-nowrap'>: ${formatAmount(amount)}</p>
                {!readOnly && (
                  <RemoveExpense id={id} name={name} expenses={expenses} setExpenses={setExpenses} className='mx-1' />
                )}
              </li>
            ))}
            <li className='mt-auto flex justify-between font-semibold py-2'>
              <p>TOTAL:</p>
              <p>$ {formatAmount(expenses.reduce((acc, cv) => acc + cv.amount, 0))}</p>
            </li>
          </ul>
        ) : (
          <p className='m-auto text-gray-500 text-center'>🤑 {t('Enter a Participant to get started!')} 💸</p>
        )}
      </section>
    </>
  )
}
