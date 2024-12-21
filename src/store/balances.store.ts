import { Balance } from '@/types/balance.types'
import { useLocalStorage } from 'usehooks-ts'

export const useSetBalances = () => {
  return useLocalStorage<Balance[]>('balances', [], { initializeWithValue: false })
}
