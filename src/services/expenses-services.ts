import Expenses from '@/db/firebase/repositories.ts/expenses-db'

const expenses = new Expenses()

class ExpenseService {
  addExpense(data: { groupId: string; name: string; amount: number; title?: string; date?: Date }) {
    return expenses.addExpense(data)
  }

  getGroupExpenses(groupId: string) {
    return expenses.getGroupExpenses(groupId, { orderBy: ['createdAt', 'asc'] })
  }

  /* Expenses are hard deleted */
  removeExpense(expenseId: string) {
    return expenses.removeExpense(expenseId)
  }
}

export default ExpenseService
