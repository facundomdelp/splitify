/* eslint-disable @typescript-eslint/no-unused-vars */
import { Expenses, Transfer } from '@/types'

export function calculateTransfers(expenses: Expenses): Transfer[] {
  const total = Object.values(expenses).reduce((sum, expense) => sum + expense, 0)
  const peopleCount = Object.keys(expenses).length
  const averageExpense = total / peopleCount

  const balances: { [person: string]: number } = Object.fromEntries(
    Object.entries(expenses).map(([person, expense]) => [person, Number((averageExpense - expense).toFixed(2))]),
  )

  const debtors: { [person: string]: number } = Object.fromEntries(
    Object.entries(balances).filter(([_, balance]) => balance > 0),
  )

  const creditors: { [person: string]: number } = Object.fromEntries(
    Object.entries(balances)
      .filter(([_, balance]) => balance < 0)
      .map(([person, balance]) => [person, Math.abs(balance)]),
  )

  const transfers: Transfer[] = []

  const sortedDebtors = Object.entries(debtors).sort(([_, a], [__, b]) => b - a)

  const sortedCreditors = Object.entries(creditors).sort(([_, a], [__, b]) => b - a)

  for (const [debtor, debtorAmount] of sortedDebtors) {
    if (debtorAmount <= 0) continue

    for (const [creditor, creditorAmount] of sortedCreditors) {
      if (creditorAmount <= 0) continue

      const amount = Math.min(debtorAmount, creditorAmount)
      transfers.push({
        debtor,
        creditor,
        amount: Number(amount.toFixed(2)),
      })

      debtors[debtor] = Number((debtorAmount - amount).toFixed(2))
      creditors[creditor] = Number((creditorAmount - amount).toFixed(2))
    }
  }

  return transfers
}
