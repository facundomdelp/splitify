export type Expense = {
  id: string
  optimistic?: boolean
  name: string
  amount: number
  title?: string
  date?: string
}

export type AddExpenseRequestBody = {
  groupId: string
  name: string
  amount: number
  title?: string
  date?: string
}
