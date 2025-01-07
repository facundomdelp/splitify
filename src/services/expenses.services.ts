import Expenses from '@/db/repositories.ts/expenses.db'

const expenses = new Expenses()

class ExpenseService {
  async addExpense(data: { groupId: string; name: string; amount: number; title?: string; date?: Date }) {
    return expenses.addExpense(data)
  }

  async getGroupExpenses(groupId: string) {
    return expenses.getGroupExpenses(groupId)
  }
}

export default ExpenseService
