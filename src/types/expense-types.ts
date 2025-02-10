export type Expense = {
  id: string
  name: string
  amount: number
  title?: string
  date?: number
}

export type GroupExpense = Expense & {
  groupId: string
  createdAt: number
}

export type AddExpenseRequestBody = {
  name: string
  amount: number
  title?: string
  date?: number
}

export type UpdateExpenseRequestBody = AddExpenseRequestBody
