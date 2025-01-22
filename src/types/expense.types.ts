export type Expense = {
  id: string
  optimistic?: boolean
  name: string
  amount: number
  title?: string
  date?: number
}

export type AddExpenseRequestBody = {
  name: string
  amount: number
  title?: string
  date?: number
}

export type GetGroupExpensesResponse = {
  group: Array<Expense>
}
