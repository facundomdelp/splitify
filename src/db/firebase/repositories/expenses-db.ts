import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy as orderByDb,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'

import { GroupExpense } from '@/types/expense-types'

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
    sharedWith,
  }: {
    groupId: string
    name: string
    amount: number
    title?: string
    date?: Date
    sharedWith?: string[]
  }) {
    return (
      await addDoc(this.expenseCollection, {
        createdAt: Timestamp.fromDate(new Date()),
        groupId,
        name,
        amount,
        title: title || '',
        date: date ? Timestamp.fromDate(date) : '',
        sharedWith: sharedWith || [],
      })
    ).id
  }

  /* Expenses are hard deleted */
  async removeExpense(expenseId: string) {
    const expenseRef = this.getExpenseRef(expenseId)
    return await deleteDoc(expenseRef)
  }

  async getGroupExpenses(groupId: string, params?: { orderBy?: [keyof GroupExpense, 'asc' | 'desc'] }) {
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
      sharedWith: doc.data().sharedWith || [],
    }))
  }

  async updateExpense({
    expenseId,
    name,
    amount,
    title,
    date,
    sharedWith,
  }: {
    expenseId: string
    name: string
    amount: number
    title?: string
    date?: Date
    sharedWith?: string[]
  }) {
    const expenseRef = this.getExpenseRef(expenseId)

    return await updateDoc(expenseRef, {
      name,
      amount,
      title: title || '',
      date: date ? Timestamp.fromDate(date) : '',
      sharedWith: sharedWith || [],
    })
  }
}

export default Expenses
