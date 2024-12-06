import { Expense } from '@/types/Expense'
import { useLocalStorage } from 'usehooks-ts'

export const useGetExpenses = () => {
  return useLocalStorage<Expense[]>('expenses', [], { initializeWithValue: false })
}
