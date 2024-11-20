export interface Expenses {
  [person: string]: number
}

export interface Transfer {
  debtor: string
  creditor: string
  amount: number
}
