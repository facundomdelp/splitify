import { addDoc, collection, deleteDoc, doc, Timestamp } from 'firebase/firestore'
import { db } from '..'

const EXPENSES = 'expenses'

class Expenses {
  private expenseCollection = collection(db, EXPENSES)

  private getExpenseRef = (expenseId: string) => {
    return doc(db, EXPENSES, expenseId)
  }

  async addExpense({
    groupId,
    name,
    amount,
    title,
    date,
  }: {
    groupId: string
    name: string
    amount: number
    title?: string
    date?: Date
  }) {
    return (
      await addDoc(this.expenseCollection, {
        groupId,
        name,
        amount,
        title: title || '',
        date: date ? Timestamp.fromDate(date) : '',
      })
    ).id
  }

  async removeExpense(expenseId: string) {
    const expenseRef = this.getExpenseRef(expenseId)
    return await deleteDoc(expenseRef)
  }
}

export default Expenses
