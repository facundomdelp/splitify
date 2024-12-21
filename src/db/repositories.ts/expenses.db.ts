import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore'
import { db } from '..'

const EXPENSES = 'expenses'

class Expenses {
  private expenseCollection = collection(db, EXPENSES)

  private getExpenseRef = (expenseId: string) => {
    return doc(db, EXPENSES, expenseId)
  }

  async addExpense({ groupId, participant, amount }: { groupId: string; participant: string; amount: number }) {
    return await addDoc(this.expenseCollection, {
      groupId,
      participant,
      amount,
    })
  }

  async removeExpense(expenseId: string) {
    const expenseRef = this.getExpenseRef(expenseId)
    return await deleteDoc(expenseRef)
  }
}

export default Expenses
