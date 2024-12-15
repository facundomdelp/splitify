import { Balance } from '@/types/Balance'
import { useLocalStorage } from 'usehooks-ts'

export const useSetBalances = () => {
  return useLocalStorage<Balance[]>('balances', [], { initializeWithValue: false })
}
