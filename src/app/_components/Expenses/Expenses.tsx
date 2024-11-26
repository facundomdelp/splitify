import { getEmojiFromString } from '@/lib/functions/getEmojiFromString'
import { Expense } from '@/types'
import { formatAmount } from '@/lib/functions/formatAmount'
import { RemoveExpense } from './RemoveExpenses'
import { Button } from '@/components/ui/button'
import LanguageProvider, { LanguageContext } from '@/context/LanguageContext'
import { useContext } from 'react'

interface Props {
  expenses: Expense[]
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
  handleCalculateTransfers: () => void
}

export const Expenses = ({ expenses, setExpenses, handleCalculateTransfers }: Props) => {
  const { language: l } = useContext(LanguageContext)

  return (
    <>
      <section className='text-sm h-full flex flex-col min-w-0'>
        <h2 className='text-lg font-bold'>{getTranslation('Participants', l)}</h2>
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
          <p className='m-auto text-gray-500 text-center'>{getTranslation('Enter a Participant to get started!', l)}</p>
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
          {getTranslation('Calculate Balances', l)}
        </Button>
      </section>
    </>
  )
}

const TRANSLATIONS = {
  Participants: {
    es: 'Participantes',
  },
  'Enter a Participant to get started!': {
    es: '¡Ingresa un Participante para comenzar!',
  },
  'Calculate Balances': {
    es: ' Calcular Saldos',
  },
}

function getTranslation(key: keyof typeof TRANSLATIONS, lang: LanguageProvider['language']) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return TRANSLATIONS[key][lang] || key
}
