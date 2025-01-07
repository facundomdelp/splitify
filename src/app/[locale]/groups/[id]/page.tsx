'use client'

import { useGetEmojiFromString } from '@/lib/hooks/useGetEmojiFromString'
import { useCalculateGroupBalances, useGetGroup } from './hooks'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import GroupExpenses from './_components/GroupExpenses'
import { Expense } from '@/types/expense.types'
import Balances from '@/components/Balances/Balances'
import { Balance } from '@/types/balance.types'
import CopyToClipboard from '@/components/CopyToClipboard'
import { useCopyString } from '@/lib/hooks/useCopyString'

const GroupPage = () => {
  const { /* loading,  */ /* error,  */ group } = useGetGroup()

  const [expenses, setExpenses] = useState<Expense[]>([])
  const [balances, setBalances] = useState<Balance[]>([])
  const [rounded, setRounded] = useState(false)
  const [tabValue, setTabValue] = useState<'expenses' | 'balances'>('expenses')

  const { handleCalculateGroupBalances } = useCalculateGroupBalances({ expenses, balances, setBalances, setRounded })
  const copyString = useCopyString({ balances, rounded })

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
          <TabsTrigger className='w-[120px]' value='balances' onClick={handleCalculateGroupBalances}>
            Balances
          </TabsTrigger>
        </TabsList>
        <TabsContent className='mt-8 flex-1 flex flex-col' value='expenses'>
          <GroupExpenses expenses={expenses} setExpenses={setExpenses} />
        </TabsContent>
        <TabsContent className='mt-8 flex-1 flex flex-col' value='balances'>
          <section className='flex-1 flex flex-col gap-4 justify-between'>
            <Balances balances={balances} rounded={rounded} setRounded={setRounded} />
            <CopyToClipboard copyString={copyString} className='mx-4' />
          </section>
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default GroupPage
