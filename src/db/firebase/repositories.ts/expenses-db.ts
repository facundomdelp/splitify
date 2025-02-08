import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy as orderByDb,
  query,
  where,
} from 'firebase/firestore'

import { GetExpenseDto } from '@/types/expense-types'

import { db } from '..'
import { tablesNames } from '../tableNames'

const { EXPENSES } = tablesNames()

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
        createdAt: Timestamp.fromDate(new Date()),
        groupId,
        name,
        amount,
        title: title || '',
        date: date ? Timestamp.fromDate(date) : '',
      })
    ).id
  }

  /* Expenses are hard deleted */
  async removeExpense(expenseId: string) {
    const expenseRef = this.getExpenseRef(expenseId)
    return await deleteDoc(expenseRef)
  }

  async getGroupExpenses(groupId: string, params?: { orderBy?: [keyof GetExpenseDto, 'asc' | 'desc'] }) {
    const q = query(
      this.expenseCollection,
      where('groupId', '==', groupId),
      ...(params?.orderBy ? [orderByDb(...params.orderBy)] : []),
    )

    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date ? doc.data().date.toMillis() : undefined,
    }))
  }
}

export default Expenses
