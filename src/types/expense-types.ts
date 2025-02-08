export type Expense = {
  id: string
  name: string
  amount: number
  optimistic?: boolean
  title?: string
  date?: number
}

export type GetExpenseDto = {
  id: string
  groupId: string
  name: string
  amount: number
  title?: string
  date?: number
  createdAt: number
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
