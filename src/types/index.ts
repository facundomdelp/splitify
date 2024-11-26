export type Expense = { id: string; name: string; amount: number }

export interface Transfer {
  debtor: string
  creditor: string
  amount: number
}
