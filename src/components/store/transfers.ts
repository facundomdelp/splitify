import { Transfer } from '@/types/Transfer'
import { useLocalStorage } from 'usehooks-ts'

export const useSetTransfers = () => {
  return useLocalStorage<Transfer[] | null>('transfers', null, { initializeWithValue: false })
}
