import { Button } from '@/components/ui/button'
import { RemoveParticipant } from './RemoveParticipant'
import { getEmojiFromString } from '@/lib/functions/getEmojiFromString'
import { Expenses } from '@/types'

interface Props {
  participants: Expenses
  setParticipants: React.Dispatch<React.SetStateAction<Expenses>>
  handleCalculateTransfers: () => void
}

export const Participants = ({ participants, setParticipants, handleCalculateTransfers }: Props) => {
  return (
    <>
      <section className='text-sm h-full flex flex-col min-w-0'>
        <h2 className='text-lg font-bold'>Participantes</h2>
        {Object.keys(participants).length ? (
          <ul className='mt-4 flex flex-col gap-3'>
            {Object.entries(participants)
              .toReversed()
              .map(([name, amount], index) => (
                <li key={index} className='flex items-center min-w-0'>
                  <p className='mr-2'>{getEmojiFromString(name)}</p>
                  <p className='text-ellipsis whitespace-nowrap overflow-hidden min-w-0'>{name}</p>
                  <p className='whitespace-nowrap'>: ${amount.toFixed(2)}</p>
                  <RemoveParticipant name={name} participants={participants} setParticipants={setParticipants} />
                </li>
              ))}
          </ul>
        ) : (
          <p className='m-auto text-gray-500 text-center'>¡Ingresa un Participante para comenzar!</p>
        )}
      </section>

      <section className='mt-auto flex'>
        <Button className='flex-1' onClick={handleCalculateTransfers} disabled={Object.values(participants).length < 2}>
          Calcular Saldos
        </Button>
      </section>
    </>
  )
}
