import { Expense } from '@/types/expense.types'
import { useLocalStorage } from 'usehooks-ts'

export const useSetExpenses = () => {
  return useLocalStorage<Expense[]>('expenses', [], { initializeWithValue: false })
}
