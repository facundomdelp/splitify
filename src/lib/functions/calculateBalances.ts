import { Expense } from '@/types/Expense'
import { Balance } from '@/types/Balance'

export function calculateBalances(expenses: Expense[]): Balance[] {
  // Calculate the total sum of all expenses
  const total = expenses.reduce((sum, { amount }) => sum + amount, 0)

  // Calculate the total amount spent by each person
  const people = expenses.reduce(
    (acc, { name, amount }) => {
      acc[name] = (acc[name] || 0) + amount
      return acc
    },
    {} as { [name: string]: number },
  )

  // Calculate the number of people involved in the expenses and the average expense per person
  const peopleCount = Object.keys(people).length
  const averageExpense = total / peopleCount

  // Calculate the balance for each person (how much they owe or are owed)
  const balances: { [person: string]: number } = Object.fromEntries(
    Object.entries(people).map(([person, expense]) => [person, Number((averageExpense - expense).toFixed(2))]),
  )

  // Categorize each person as either a debtor or a creditor based on their balance
  const debtors: { [person: string]: number } = {}
  const creditors: { [person: string]: number } = {}

  Object.entries(balances).forEach(([person, balance]) => {
    if (balance > 0) {
      debtors[person] = balance
    } else if (balance < 0) {
      creditors[person] = Math.abs(balance)
    }
  })

  // Sort debtors and creditors by the amount they owe or are owed (largest first)
  const optimizedBalances: Balance[] = []
  const sortedDebtors = Object.entries(debtors).sort(([, a], [, b]) => b - a)
  const sortedCreditors = Object.entries(creditors).sort(([, a], [, b]) => b - a)

  // Distribute the debts between debtors and creditors
  let debtorIndex = 0
  let creditorIndex = 0

  while (debtorIndex < sortedDebtors.length && creditorIndex < sortedCreditors.length) {
    const [debtor, debtorAmount] = sortedDebtors[debtorIndex]
    const [creditor, creditorAmount] = sortedCreditors[creditorIndex]

    const amount = Math.min(debtorAmount, creditorAmount)

    if (amount > 0) {
      optimizedBalances.push({
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

  return redistributeBalances(optimizedBalances)
}

function redistributeBalances(transfers: Balance[]): Balance[] {
  // First, calculate total debts and credits per person
  const balances = new Map<string, number>()

  transfers.forEach((transfer) => {
    balances.set(transfer.debtor, (balances.get(transfer.debtor) || 0) - transfer.amount)
    balances.set(transfer.creditor, (balances.get(transfer.creditor) || 0) + transfer.amount)
  })

  // Create arrays of debtors and creditors with their total amounts
  const debtors: Array<[string, number]> = []
  const creditors: Array<[string, number]> = []

  balances.forEach((balance, person) => {
    if (balance < 0) {
      debtors.push([person, Math.abs(balance)])
    } else if (balance > 0) {
      creditors.push([person, balance])
    }
  })

  // Track number of transfers per person
  const transferCount = new Map<string, number>()

  function incrementTransferCount(person: string) {
    transferCount.set(person, (transferCount.get(person) || 0) + 1)
  }

  function getTransferCount(person: string): number {
    return transferCount.get(person) || 0
  }

  // Helper function to find the person with the least transfers
  function findPersonWithLeastTransfers(people: Array<[string, number]>): number {
    let minTransfers = Infinity
    let minIndex = 0

    people.forEach(([person, amount], index) => {
      if (amount > 0 && getTransferCount(person) < minTransfers) {
        minTransfers = getTransferCount(person)
        minIndex = index
      }
    })

    return minIndex
  }

  const newTransfers: Balance[] = []

  // Distribute transfers evenly
  while (debtors.some(([, amount]) => amount > 0) && creditors.some(([, amount]) => amount > 0)) {
    const debtorIndex = findPersonWithLeastTransfers(debtors)
    const creditorIndex = findPersonWithLeastTransfers(creditors)

    const [debtor, debtAmount] = debtors[debtorIndex]
    const [creditor, creditAmount] = creditors[creditorIndex]

    // Calculate optimal transfer amount to minimize number of transfers
    const transferAmount = Math.min(debtAmount, creditAmount)

    if (transferAmount > 0) {
      newTransfers.push({
        debtor,
        creditor,
        amount: Math.round(transferAmount),
      })

      // Update remaining amounts and transfer counts
      debtors[debtorIndex][1] -= transferAmount
      creditors[creditorIndex][1] -= transferAmount

      incrementTransferCount(debtor)
      incrementTransferCount(creditor)
    }
  }

  return newTransfers.sort((a, b) => a.debtor.localeCompare(b.debtor))
}
