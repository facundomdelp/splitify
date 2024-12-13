import { Transfer } from '@/types/Transfer'
import { useLocalStorage } from 'usehooks-ts'

export const useSetTransfers = () => {
  return useLocalStorage<Transfer[]>('transfers', [], { initializeWithValue: false })
}
