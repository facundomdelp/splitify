import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '..'

class Groups {
  async addGroup({ name, expirationDate }: { name: string; expirationDate: Date }) {
    return await addDoc(collection(db, 'group'), {
      name,
      expirationDate: Timestamp.fromDate(expirationDate),
    })
  }
}

export default Groups
