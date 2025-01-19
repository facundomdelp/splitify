'use client'

import { useTranslations } from 'next-intl'
import { useSetExpenses } from '@/store/expenses.store'
import { useSetBalances } from '@/store/balances.store'
import { useCalculateBalances, useRoundBalances } from './hooks'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ExpensesSection from '@/components/ExpensesSection'
import BalancesSection from '@/components/BalancesSection'
import { useState } from 'react'
import { generateId } from '@/lib/functions/generateId'

export default function Home() {
  const [expenses, setExpenses] = useSetExpenses()
  const [balances, setBalances] = useSetBalances()

  const [tabValue, setTabValue] = useState<'expenses' | 'balances'>('expenses')

  const { handleCalculateBalances } = useCalculateBalances({ expenses, setBalances })
  const { rounded, setRounded } = useRoundBalances({ balances })

  const addExpense = async ({
    name,
    amount,
    title,
    date,
  }: {
    name: string
    amount: number
    title?: string
    date?: number
  }) => {
    const expenseUiId = generateId()
    const newExpenses = [...(expenses ?? []), { id: expenseUiId, optimistic: false, name, amount, title, date }]

    setExpenses(newExpenses)
  }

  const t = useTranslations('Home')

  return (
    <main className='w-full my-8 text-dark max-w-[600px] space-y-6 flex flex-col'>
      {/* SEO */}
      <article className='hidden'>
        <h1>{t('🤑 Splitify | Simplify your group expenses with Splitify')}</h1>
        <p>{t('Splitify is the ultimate tool to divide expenses with friends, family, and colleagues')}</p>
      </article>
      {/* SEO */}

      <Tabs
        value={tabValue}
        onValueChange={(value) => setTabValue(value as 'expenses' | 'balances')}
        className='w-full flex flex-col flex-1'
      >
        <TabsList className='mx-auto'>
          <TabsTrigger className='w-[120px]' value='expenses'>
            Expenses
          </TabsTrigger>
          <TabsTrigger
            className='w-[120px]'
            value='balances'
            onClick={handleCalculateBalances}
            disabled={
              !expenses ||
              new Set(expenses.map(({ name }) => name)).size < 2 ||
              new Set(
                Object.values(
                  expenses.reduce<Record<string, number>>(
                    (acc, { amount, name }) => ({ ...acc, [name]: (acc[name] ? acc[name] : 0) + amount }),
                    {},
                  ),
                ),
              ).size === 1 ||
              expenses.reduce((acc, { amount }) => amount + acc, 0) === 0
            }
          >
            Balances
          </TabsTrigger>
        </TabsList>
        <TabsContent className='mt-8 flex-1 flex flex-col' value='expenses'>
          <ExpensesSection expenses={expenses} setExpenses={setExpenses} addExpenseAction={addExpense} />
        </TabsContent>
        <TabsContent className='mt-8 flex-1 flex flex-col' value='balances'>
          <BalancesSection balances={balances} rounded={rounded} setRounded={setRounded} />
        </TabsContent>
      </Tabs>
    </main>
  )
}
