import { calculateBalances } from '@/utils/functions/calculateBalances'

// npx tsx scripts/calculateBalances.ts

const expenses = [
  { name: 'Caio', amount: 0 },
  { name: 'Bot', amount: 0 },
  { name: 'Burro', amount: 0 },
  { name: 'Nano', amount: 0 },
  { name: 'Terito', amount: 0 },
  { name: 'Gordo', amount: 0 },
  { name: 'Parse', amount: 0 },
  { name: 'Garza', amount: 0 },
  { name: 'Keto', amount: 0 },
  { name: 'Pela', amount: 0 },
  { name: 'Juanita', amount: 0 },
  { name: 'Negra', amount: 0 },
  { name: 'Carito', amount: 18000 },
  { name: 'Moro', amount: 14000 },
  { name: 'Lagar', amount: 18240 },
  { name: 'Marto', amount: 170000 },
]

const result = calculateBalances(expenses)

console.log(result)
