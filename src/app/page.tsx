'use client'

import { Participants } from './_components/Participants/Participants'
import Transfers from './_components/Transfers'
import ParticipantsForm from './_components/Participants/ParticipantsForm'
import { useLocalStorage } from '@/lib/hooks/useLocalStore'
import { Expenses, Transfer } from '@/types'
import { calculateTransfers } from '@/lib/functions/calculateTransfers'

export default function Home() {
  const [participants, setParticipants] = useLocalStorage<Expenses>('participants', {})
  const [transfers, setTransfers] = useLocalStorage<Transfer[]>('transfers', [])

  const handleCalculateTransfers = () => {
    setTransfers(calculateTransfers(participants))
  }

  const onClean = () => {
    setParticipants({})
  }

  return (
    <main className='my-8 mx-4 flex flex-col gap-8 max-w-[600px] text-gray-600 flex-1 min-w-0 cursor-default'>
      <ParticipantsForm
        participants={participants}
        setParticipants={setParticipants}
        disabled={transfers.length > 0}
        onReturn={transfers.length > 0 ? () => setTransfers([]) : undefined}
      />

      {!transfers.length ? (
        <Participants
          participants={participants}
          setParticipants={setParticipants}
          handleCalculateTransfers={handleCalculateTransfers}
        />
      ) : (
        <Transfers transfers={transfers} setTransfers={setTransfers} onClean={onClean} />
      )}
    </main>
  )
}
