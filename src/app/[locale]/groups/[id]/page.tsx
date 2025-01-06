'use client'

import { useGetEmojiFromString } from '@/lib/hooks/useGetEmojiFromString'
import { useGetGroup } from './hooks'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import GroupExpenses from './_components/GroupExpenses'
import { Expense } from '@/types/expense.types'
import Balances from '@/components/Balances/Balances'
import { Balance } from '@/types/balance.types'

const GroupPage = () => {
  const { /* loading,  */ /* error,  */ group } = useGetGroup()

  const [expenses, setExpenses] = useState<Expense[]>([])
  const [balances, setBalances] = useState<Balance[]>([])

  const [tabValue, setTabValue] = useState<'expenses' | 'balances'>('expenses')

  const getEmojiFromString = useGetEmojiFromString(true)

  return (
    <main className='w-full my-8 text-dark max-w-[600px] space-y-6 flex flex-col'>
      {group && (
        <div className='flex justify-center items-center gap-2'>
          <h2 className='text-lg font-bold flex flex-nowrap gap-2 justify-center text-green-800' id='expenses'>
            {getEmojiFromString(group.id)} {group?.name}
          </h2>
          {/* <PencilIcon className='size-[16px] text-gray-500' /> */}
        </div>
      )}

      <Tabs
        value={tabValue}
        onValueChange={(value) => setTabValue(value as 'expenses' | 'balances')}
        className='w-full flex flex-col flex-1'
      >
        <TabsList className='mx-auto'>
          <TabsTrigger className='w-[120px]' value='expenses'>
            Expenses
          </TabsTrigger>
          <TabsTrigger className='w-[120px]' value='balances'>
            Balances
          </TabsTrigger>
        </TabsList>
        <TabsContent className='mt-8 flex-1 flex flex-col' value='expenses'>
          <GroupExpenses expenses={expenses} setExpenses={setExpenses} />
        </TabsContent>
        <TabsContent className='mt-8 flex-1 flex flex-col' value='balances'>
          <Balances balances={balances} onReset={() => ''} setBalances={setBalances} />
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default GroupPage
