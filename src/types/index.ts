export interface Expenses {
  [participant: string]: number
}

export interface Transfer {
  debtor: string
  creditor: string
  amount: number
}
