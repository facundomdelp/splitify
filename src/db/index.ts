import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'splitify-bd940.firebaseapp.com',
  projectId: 'splitify-bd940',
  storageBucket: 'splitify-bd940.firebasestorage.app',
  messagingSenderId: '440055759870',
  appId: process.env.FIREBASE_APP_ID,
  // measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
