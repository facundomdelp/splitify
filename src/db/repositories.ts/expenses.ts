import { addDoc, collection } from 'firebase/firestore'
import { db } from '..'

class Expenses {
  async addExpense({ groupId, participantName, amount }: { groupId: string; participantName: string; amount: number }) {
    return await addDoc(collection(db, 'expense'), {
      groupId,
      participantName,
      amount,
    })
  }
}

export default Expenses
