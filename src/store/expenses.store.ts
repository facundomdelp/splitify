import { useLocalStorage } from 'usehooks-ts'

import { Expense } from '@/types/expense.types'

export const useSetExpenses = () => {
  return useLocalStorage<Expense[]>('expenses', [], { initializeWithValue: false })
}
