export type Expense = {
  id: string
  name: string
  amount: number
  title?: string
  date?: number
  sharedWith?: string[]
}

export type ExpenseDraft = Omit<Expense, 'id'>

export type GroupExpense = Expense & {
  groupId: string
  createdAt: number
}

export type Participant = {
  name: string
  hasExpenses: boolean
}

export type AddExpenseRequestBody = {
  name: string
  amount: number
  title?: string
  date?: number
  sharedWith?: string[]
}

export type UpdateExpenseRequestBody = AddExpenseRequestBody
