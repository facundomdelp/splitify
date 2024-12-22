import { Expense } from '@/types/Expense'
import { Balance } from '@/types/Balance'

export function calculateBalances(expenses: Array<Pick<Expense, 'name' | 'amount'>>): Balance[] {
  // Calculate the total sum and per-person spending
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

  // Calculate initial balances
  const balances: { [person: string]: number } = Object.fromEntries(
    Object.entries(people).map(([person, expense]) => [person, Number((averageExpense - expense).toFixed(2))]),
  )

  // Track number of transfers per person
  const transferCount = new Map<string, number>()
  const incrementTransferCount = (person: string) => {
    transferCount.set(person, (transferCount.get(person) || 0) + 1)
  }
  const getTransferCount = (person: string): number => transferCount.get(person) || 0

  // Separate and sort debtors and creditors
  const debtors = Object.entries(balances)
    .filter(([, balance]) => balance > 0)
    .map(([person, balance]) => [person, balance] as [string, number])
    .sort(([, a], [, b]) => b - a)

  const creditors = Object.entries(balances)
    .filter(([, balance]) => balance < 0)
    .map(([person, balance]) => [person, Math.abs(balance)] as [string, number])
    .sort(([, a], [, b]) => b - a)

  // Helper function to find person with least transfers
  const findPersonWithLeastTransfers = (people: Array<[string, number]>): number => {
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

  const optimizedBalances: Balance[] = []

  // Optimize transfers (total and per participant)
  while (debtors.some(([, amount]) => amount > 0) && creditors.some(([, amount]) => amount > 0)) {
    const debtorIndex = findPersonWithLeastTransfers(debtors)
    const creditorIndex = findPersonWithLeastTransfers(creditors)

    const [debtor, debtorAmount] = debtors[debtorIndex]
    const [creditor, creditorAmount] = creditors[creditorIndex]

    const amount = Math.min(debtorAmount, creditorAmount)

    if (amount > 0) {
      optimizedBalances.push({
        debtor,
        creditor,
        amount: Number(amount.toFixed(2)),
      })

      // Update remaining amounts
      debtors[debtorIndex][1] = Number((debtorAmount - amount).toFixed(2))
      creditors[creditorIndex][1] = Number((creditorAmount - amount).toFixed(2))

      // Track transfer counts
      incrementTransferCount(debtor)
      incrementTransferCount(creditor)
    }

    // Remove settled balances
    if (debtors[debtorIndex][1] === 0) debtors[debtorIndex][1] = 0
    if (creditors[creditorIndex][1] === 0) creditors[creditorIndex][1] = 0
  }

  return optimizedBalances.sort((a, b) => a.debtor.localeCompare(b.debtor))
}
