import { Expense, Participant } from '@/types/expense-types'

type ExpenseParticipation = Pick<Expense, 'name' | 'sharedWith'>

export const getParticipantNames = (expenses: ExpenseParticipation[]): string[] => [
  ...new Set(expenses.flatMap(({ name, sharedWith }) => [name, ...(sharedWith ?? [])])),
]

export const getParticipants = (expenses: ExpenseParticipation[]): Participant[] =>
  getParticipantNames(expenses).map((name) => ({
    name,
    hasExpenses: expenses.some((expense) => expense.name === name),
  }))

export const getExpenseSharers = (expense: ExpenseParticipation, participantNames: string[]): string[] =>
  expense.sharedWith?.length ? expense.sharedWith : participantNames

export const getPartialSharers = (expense: ExpenseParticipation, participantNames: string[]): string[] | undefined => {
  const sharers = getExpenseSharers(expense, participantNames)

  return sharers.length < participantNames.length ? sharers : undefined
}
