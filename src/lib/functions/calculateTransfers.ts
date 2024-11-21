import { Expenses, Transfer } from '@/types'

export function calculateTransfers(expenses: Expenses): Transfer[] {
  const total = Object.values(expenses).reduce((sum, expense) => sum + expense, 0)
  const peopleCount = Object.keys(expenses).length
  const averageExpense = total / peopleCount

  // Calculate net balances
  const balances: { [person: string]: number } = Object.fromEntries(
    Object.entries(expenses).map(([person, expense]) => [person, Number((averageExpense - expense).toFixed(2))]),
  )

  // Separate debtors and creditors
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

  // Sort debtors and creditors by absolute amount, largest first
  const sortedDebtors = Object.entries(debtors).sort(([, a], [, b]) => b - a)
  const sortedCreditors = Object.entries(creditors).sort(([, a], [, b]) => b - a)

  let debtorIndex = 0
  let creditorIndex = 0

  // Minimize transfers by matching largest amounts first
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

      // Update remaining balances
      sortedDebtors[debtorIndex][1] = Number((debtorAmount - amount).toFixed(2))
      sortedCreditors[creditorIndex][1] = Number((creditorAmount - amount).toFixed(2))
    }

    // Move to next debtor or creditor based on remaining balance
    if (sortedDebtors[debtorIndex][1] === 0) debtorIndex++
    if (sortedCreditors[creditorIndex][1] === 0) creditorIndex++
  }

  return transfers
}
