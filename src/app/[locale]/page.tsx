'use client'

import { useTranslations } from 'next-intl'
import { useSetExpenses } from '@/store/expenses.store'
import { useSetBalances } from '@/store/balances.store'
import { useAddExpense, useCalculateBalances, useConvertIntoGroup, useRoundBalances } from './hooks'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ExpensesSection from '@/components/ExpensesSection'
import BalancesSection from '@/components/BalancesSection'
import { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { EllipsisVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Spinner from '@/components/ui/spinner'

export default function Home() {
  const [expenses, setExpenses] = useSetExpenses()
  const [balances, setBalances] = useSetBalances()

  const [tabValue, setTabValue] = useState<'expenses' | 'balances'>('expenses')

  const { addExpense } = useAddExpense({ expenses, setExpenses })
  const { handleCalculateBalances } = useCalculateBalances({ expenses, setBalances })
  const { rounded, setRounded } = useRoundBalances({ balances })
  const { convertIntoGroup, convertToGroupState } = useConvertIntoGroup({ setExpenses, setBalances })

  const t = useTranslations('Home')

  return (
    <main className='w-full my-8 text-dark max-w-[600px] space-y-6 flex flex-col'>
      <div className='flex justify-center items-center gap-2 relative'>
        {/* SEO */}
        <article className='hidden'>
          <h1>{t('🤑 Splitify | Simplify your group expenses with Splitify')}</h1>
          <p>{t('Splitify is the ultimate tool to divide expenses with friends, family, and colleagues')}</p>
        </article>
        {/* SEO */}

        <h2 className='text-lg font-bold flex flex-nowrap gap-2 justify-center text-green-800' id='expenses'>
          ⚡{'Spliti Ya'}
        </h2>
        <div className='absolute right-2'>
          {!convertToGroupState.loading ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='px-3'>
                  <EllipsisVertical className='text-gray-600' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' alignOffset={24} sideOffset={-5}>
                <DropdownMenuItem className='text-xs text-gray-500' onClick={() => convertIntoGroup(expenses)}>
                  Convertir en Grupo ✈️
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Spinner className='w-fit px-4 text-green-600' />
          )}
        </div>
      </div>

      <Tabs
        value={tabValue}
        onValueChange={(value) => setTabValue(value as 'expenses' | 'balances')}
        className='w-full flex flex-col flex-1'
      >
        <div className='flex relative'>
          <TabsList className='mx-auto scale-[80%] xs:scale-100'>
            <TabsTrigger className='w-[120px]' value='expenses' disabled={convertToGroupState.loading}>
              Expenses
            </TabsTrigger>
            <TabsTrigger
              className='w-[120px]'
              value='balances'
              onClick={handleCalculateBalances}
              disabled={
                !expenses ||
                convertToGroupState.loading ||
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
        </div>

        <TabsContent className='mt-8 flex-1 flex flex-col' value='expenses'>
          <ExpensesSection
            expenses={expenses}
            setExpenses={setExpenses}
            addExpenseAction={addExpense}
            disabled={convertToGroupState.loading}
          />
        </TabsContent>
        <TabsContent className='mt-8 flex-1 flex flex-col' value='balances'>
          <BalancesSection balances={balances} rounded={rounded} setRounded={setRounded} />
        </TabsContent>
      </Tabs>
    </main>
  )
}
