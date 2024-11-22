import { calculateTransfers } from '@/lib/functions/calculateTransfers'
import { useLocalStorage } from '@/lib/hooks/useLocalStore'
import { Expenses, Transfer } from '@/types'

export const useCalculateTransfers = ({
  participants,
  setParticipants,
}: {
  participants: Expenses
  setParticipants: React.Dispatch<React.SetStateAction<Expenses>>
}) => {
  const [transfers, setTransfers] = useLocalStorage<Transfer[]>('transfers', [])

  const handleCalculateTransfers = () => {
    setTransfers(calculateTransfers(participants))
    setParticipants({})
  }

  return { transfers, setTransfers, handleCalculateTransfers }
}
