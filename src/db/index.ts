import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBHV8-pZsMJjUhr5MHrlnTE1zgq4TUkM7c',
  authDomain: 'splitify-bd940.firebaseapp.com',
  projectId: 'splitify-bd940',
  storageBucket: 'splitify-bd940.firebasestorage.app',
  messagingSenderId: '440055759870',
  appId: '1:440055759870:web:7b91ea5fa70f774b7076af',
  measurementId: 'G-Q0XT4K0ZT2',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
