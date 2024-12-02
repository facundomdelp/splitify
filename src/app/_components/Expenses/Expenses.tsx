import { Expense } from '@/types/Expense'
import { formatAmount } from '@/lib/functions/formatAmount'
import { RemoveExpense } from './RemoveExpense'
import { Button } from '@/components/ui/button'
import { useTranslate } from '@/lib/hooks/useTranslate'
import { Translations } from '@/types/Common'
import { RefreshCwIcon } from 'lucide-react'
import { useGetEmojiFromString } from '@/lib/hooks/useGetEmojiFromString'
import { useHandleChangeEmojis } from './hooks'

interface Props {
  expenses: Expense[]
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
  handleCalculateTransfers: () => void
}

export const Expenses = ({ expenses, setExpenses, handleCalculateTransfers }: Props) => {
  const t = useTranslate(translations)

  const { handleChangeEmojis, rotate } = useHandleChangeEmojis()
  const getEmojiFromString = useGetEmojiFromString()

  return (
    <>
      <section className='text-sm h-full flex flex-col min-w-0'>
        <div className='flex items-center'>
          <h2 className='text-lg font-bold'>{t('Participants')}</h2>
          <Button size='icon' variant='ghost' className='size-[18px] ml-auto' onClick={handleChangeEmojis}>
            <RefreshCwIcon className={rotate ? 'rotate-180 transition-transform duration-500' : ''} />
          </Button>
        </div>
        {Object.keys(expenses).length ? (
          <ul className='mt-4 flex flex-col gap-3 min-w-0'>
            {expenses.toReversed().map(({ id, name, amount }, index) => (
              <li key={index} className='flex items-center min-w-0'>
                <p className='mr-2'>{getEmojiFromString(name)}</p>
                <p className='text-ellipsis whitespace-nowrap overflow-hidden min-w-0'>{name}</p>
                <p className='whitespace-nowrap'>: ${formatAmount(amount)}</p>
                <RemoveExpense id={id} name={name} expenses={expenses} setExpenses={setExpenses} className='mx-1' />
              </li>
            ))}
          </ul>
        ) : (
          <p className='m-auto text-gray-500 text-center'>🤑 {t('Enter a Participant to get started!')} 💸</p>
        )}
      </section>

      <section className='mt-auto flex'>
        <Button
          className='flex-1'
          onClick={handleCalculateTransfers}
          disabled={
            new Set(expenses.map(({ name }) => name)).size < 2 ||
            new Set(
              Object.values(
                expenses.reduce<Record<string, number>>(
                  (acc, { amount, name }) => ({ ...acc, [name]: (acc[name] ? acc[name] : 0) + amount }),
                  {},
                ),
              ),
            ).size === 1 ||
            expenses.reduce((acc, { amount }) => amount + acc, 0) === 0
          }
        >
          {t('Calculate Balances')}
        </Button>
      </section>
    </>
  )
}

const translations = {
  Participants: {
    es: 'Participantes',
  },
  'Enter a Participant to get started!': {
    es: '¡Ingresa un Participante para comenzar!',
  },
  'Calculate Balances': {
    es: ' Calcular Saldos',
  },
  Balances: {
    es: 'Saldos',
  },
} satisfies Translations
