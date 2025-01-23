import { useLocalStorage } from 'usehooks-ts'

import { Balance } from '@/types/balance.types'

export const useSetBalances = () => {
  return useLocalStorage<Balance[]>('balances', [], { initializeWithValue: false })
}
