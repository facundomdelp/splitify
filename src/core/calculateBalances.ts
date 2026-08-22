/*
  How balances are calculated

  1. Everyone who paid for something, or was picked to share an expense, is part of the group.
  2. Each expense is split between the people sharing it. When nobody is picked, it is split between everyone.
  3. Amounts are handled in cents, so no money is lost when rounding. Leftover cents go to the first people of the split.
  4. Each person ends up with what they should have paid, minus what they actually paid.
  5. Those who paid too little pay those who paid too much.
  6. A payment that leaves both people done is always chosen first, so fewer payments are needed overall.
  7. Otherwise the biggest payment possible wins, and ties go to whoever has taken part in the fewest payments.
  8. Nobody ends up paying more people than there are people to pay.
  9. The final list is sorted by the name of whoever has to pay.
*/
import { Balance } from '@/types/balance-types'
import { Expense } from '@/types/expense-types'

import { getExpenseSharers, getParticipantNames } from '@/utils/functions/getParticipants'

type SharedExpense = Pick<Expense, 'name' | 'amount' | 'sharedWith'>
type PendingCents = Array<[string, number]>

class BalancesCalculator {
  private readonly expenses: SharedExpense[]
  private readonly participants: string[]
  private readonly owedCents: Map<string, number>
  private readonly transfersCount = new Map<string, number>()

  constructor(expenses: SharedExpense[]) {
    this.expenses = expenses
    this.participants = getParticipantNames(expenses)
    this.owedCents = new Map(this.participants.map((participant) => [participant, 0]))
  }

  calculate(): Balance[] {
    this.shareExpenses()

    return this.settle(this.getDebtors(), this.getCreditors()).sort((a, b) => a.debtor.localeCompare(b.debtor))
  }

  private toCents(amount: number): number {
    return Math.round(amount * 100)
  }

  private splitCents(cents: number, sharersCount: number): number[] {
    const share = Math.floor(cents / sharersCount)
    const remainder = cents - share * sharersCount

    return Array.from({ length: sharersCount }, (_, index) => share + (index < remainder ? 1 : 0))
  }

  private addCents(participant: string, cents: number) {
    this.owedCents.set(participant, (this.owedCents.get(participant) ?? 0) + cents)
  }

  private shareExpenses() {
    this.expenses.forEach((expense) => {
      const sharers = getExpenseSharers(expense, this.participants)
      const cents = this.toCents(expense.amount)

      this.addCents(expense.name, -cents)
      this.splitCents(cents, sharers.length).forEach((share, index) => this.addCents(sharers[index], share))
    })
  }

  private getDebtors(): PendingCents {
    return [...this.owedCents].filter(([, owed]) => owed > 0).sort(([, a], [, b]) => b - a)
  }

  private getCreditors(): PendingCents {
    return [...this.owedCents]
      .filter(([, owed]) => owed < 0)
      .map(([participant, owed]) => [participant, -owed] as [string, number])
      .sort(([, a], [, b]) => b - a)
  }

  private getTransfersCount(participant: string): number {
    return this.transfersCount.get(participant) ?? 0
  }

  private countTransfer(participant: string) {
    this.transfersCount.set(participant, this.getTransfersCount(participant) + 1)
  }

  private rankPayment(debt: number, credit: number, debtor: string, creditor: string): number[] {
    const cents = Math.min(debt, credit)
    const settledPeople = (debt === cents ? 1 : 0) + (credit === cents ? 1 : 0)

    return [-settledPeople, -cents, this.getTransfersCount(debtor), this.getTransfersCount(creditor)]
  }

  private isBetterPayment(candidate: number[], best: number[]): boolean {
    const difference = candidate.findIndex((value, index) => value !== best[index])

    return difference !== -1 && candidate[difference] < best[difference]
  }

  private findNextPayment(debtors: PendingCents, creditors: PendingCents): [number, number] {
    let payment: [number, number] = [-1, -1]
    let best: number[] = []

    debtors.forEach(([debtor, debt], debtorIndex) => {
      if (debt <= 0) return

      creditors.forEach(([creditor, credit], creditorIndex) => {
        if (credit <= 0) return

        const rank = this.rankPayment(debt, credit, debtor, creditor)

        if (payment[0] === -1 || this.isBetterPayment(rank, best)) {
          best = rank
          payment = [debtorIndex, creditorIndex]
        }
      })
    })

    return payment
  }

  private settle(debtors: PendingCents, creditors: PendingCents): Balance[] {
    const balances: Balance[] = []

    while (debtors.some(([, pending]) => pending > 0) && creditors.some(([, pending]) => pending > 0)) {
      const [debtorIndex, creditorIndex] = this.findNextPayment(debtors, creditors)

      const [debtor, debt] = debtors[debtorIndex]
      const [creditor, credit] = creditors[creditorIndex]
      const cents = Math.min(debt, credit)

      balances.push({ debtor, creditor, amount: cents / 100 })

      debtors[debtorIndex][1] = debt - cents
      creditors[creditorIndex][1] = credit - cents

      this.countTransfer(debtor)
      this.countTransfer(creditor)
    }

    return balances
  }
}

export const calculateBalances = (expenses: SharedExpense[]): Balance[] => new BalancesCalculator(expenses).calculate()
