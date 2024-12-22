import { calculateBalances } from '@/lib/functions/calculateBalances'

// npx tsx scripts/calculateBalances.ts

const expenses = [
  { id: '0', name: 'Caio', amount: 0 },
  { id: '1', name: 'Bot', amount: 0 },
  { id: '2', name: 'Burro', amount: 0 },
  { id: '3', name: 'Nano', amount: 0 },
  { id: '4', name: 'Terito', amount: 0 },
  { id: '5', name: 'Gordo', amount: 0 },
  { id: '6', name: 'Parse', amount: 0 },
  { id: '7', name: 'Garza', amount: 0 },
  { id: '8', name: 'Keto', amount: 0 },
  { id: '9', name: 'Pela', amount: 0 },
  { id: '10', name: 'Juanita', amount: 0 },
  { id: '11', name: 'Negra', amount: 0 },
  { id: '12', name: 'Carito', amount: 18000 },
  { id: '13', name: 'Moro', amount: 14000 },
  { id: '14', name: 'Lagar', amount: 18240 },
  { id: '15', name: 'Marto', amount: 170000 },
]

const result = calculateBalances(expenses)

console.log(result)
