import { Expense, Transfer } from '@/types'

export function calculateTransfers(expenses: Expense[]): Transfer[] {
  const total = expenses.reduce((sum, { amount }) => sum + amount, 0)
  const people = expenses.reduce(
    (acc, { name, amount }) => {
      acc[name] = (acc[name] || 0) + amount
      return acc
    },
    {} as { [name: string]: number },
  )

  const peopleCount = Object.keys(people).length
  const averageExpense = total / peopleCount

  const balances: { [person: string]: number } = Object.fromEntries(
    Object.entries(people).map(([person, expense]) => [person, Number((averageExpense - expense).toFixed(2))]),
  )

  const debtors: { [person: string]: number } = {}
  const creditors: { [person: string]: number } = {}

  Object.entries(balances).forEach(([person, balance]) => {
    if (balance > 0) {
      debtors[person] = balance
    } else if (balance < 0) {
      creditors[person] = Math.abs(balance)
    }
  })

  const transfers: Transfer[] = []
  const sortedDebtors = Object.entries(debtors).sort(([, a], [, b]) => b - a)
  const sortedCreditors = Object.entries(creditors).sort(([, a], [, b]) => b - a)

  let debtorIndex = 0
  let creditorIndex = 0

  while (debtorIndex < sortedDebtors.length && creditorIndex < sortedCreditors.length) {
    const [debtor, debtorAmount] = sortedDebtors[debtorIndex]
    const [creditor, creditorAmount] = sortedCreditors[creditorIndex]

    const amount = Math.min(debtorAmount, creditorAmount)

    if (amount > 0) {
      transfers.push({
        debtor,
        creditor,
        amount: Number(amount.toFixed(2)),
      })

      sortedDebtors[debtorIndex][1] = Number((debtorAmount - amount).toFixed(2))
      sortedCreditors[creditorIndex][1] = Number((creditorAmount - amount).toFixed(2))
    }

    if (sortedDebtors[debtorIndex][1] === 0) debtorIndex++
    if (sortedCreditors[creditorIndex][1] === 0) creditorIndex++
  }

  return transfers
}
