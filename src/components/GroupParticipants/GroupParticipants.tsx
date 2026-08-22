import { useState } from 'react'

import { Participant } from '@/types/expense-types'

import ParticipantPill from '@/components/ParticipantPill'
import ParticipantRemoveConfirmModal from '@/components/ParticipantRemoveConfirmModal'

interface Props {
  participants: Participant[]
  onRemove: (name: string) => void
}

const GroupParticipants = ({ participants, onRemove }: Props) => {
  const [participantToRemove, setParticipantToRemove] = useState<Participant | null>(null)

  if (!participants.length) return null

  return (
    <>
      <ul className='flex flex-wrap gap-2'>
        {participants.map((participant) => (
          <ParticipantPill
            key={participant.name}
            name={participant.name}
            onRemove={() => setParticipantToRemove(participant)}
          />
        ))}
      </ul>

      {participantToRemove && (
        <ParticipantRemoveConfirmModal
          open
          onOpenChange={() => setParticipantToRemove(null)}
          name={participantToRemove.name}
          hasExpenses={participantToRemove.hasExpenses}
          onConfirm={() => onRemove(participantToRemove.name)}
        />
      )}
    </>
  )
}

export default GroupParticipants
