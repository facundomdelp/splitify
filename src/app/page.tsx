'use client'

import { Button } from '@/components/ui/button'
import { Participants } from './_components/Participants/Participants'
import Transfers from './_components/Transfers'
import ParticipantsForm from './_components/Participants/ParticipantsForm'
import { useLocalStorage } from '@/lib/hooks/useLocalStore'
import { Expenses, Transfer } from '@/types'
import { calculateTransfers } from '@/lib/functions/calculateTransfers'
import { CleanTransfers } from './_components/Transfers/CleanTransfers'

export default function Home() {
  const [participants, setParticipants] = useLocalStorage<Expenses>('participants', {})
  const [transfers, setTransfers] = useLocalStorage<Transfer[]>('transfers', [])

  const handleCalculateTransfers = () => {
    setTransfers(calculateTransfers(participants))
    setParticipants({})
  }

  return (
    <main className='my-8 mx-4 flex flex-col gap-8 max-w-[600px] text-gray-600 flex-1 min-w-0'>
      <ParticipantsForm participants={participants} setParticipants={setParticipants} disabled={transfers.length > 0} />

      {!transfers.length ? (
        <Participants participants={participants} setParticipants={setParticipants} />
      ) : (
        <Transfers transfers={transfers} />
      )}

      {!transfers.length ? (
        <section className='mt-auto flex'>
          <Button
            className='flex-1'
            onClick={handleCalculateTransfers}
            disabled={
              Object.values(participants).length < 2 ||
              Object.values(participants).reduce((cv, acc) => cv + acc, 0) === 0
            }
          >
            Calcular Saldos
          </Button>
        </section>
      ) : (
        <section className='mt-auto flex'>
          <CleanTransfers setTransfers={setTransfers} />
        </section>
      )}
    </main>
  )
}
