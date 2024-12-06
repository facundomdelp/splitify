import { Transfer } from '@/types/Transfer'
import { useLocalStorage } from 'usehooks-ts'

export const useGetTransfers = () => {
  return useLocalStorage<Transfer[]>('transfers', [], { initializeWithValue: false })
}
