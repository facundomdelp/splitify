import { Expense } from '@/types/Expense'
import { useLocalStorage } from 'usehooks-ts'

export const useSetExpenses = () => {
  return useLocalStorage<Expense[]>('expenses', [], { initializeWithValue: false })
}
