'use client'

import { useGetEmojiFromString } from '@/lib/hooks/useGetEmojiFromString'
import { useGetGroup } from './hooks'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import GroupExpenses from './_components/GroupExpenses'

const GroupPage = () => {
  const { /* loading,  */ /* error,  */ group } = useGetGroup()

  const [tabValue, setTabValue] = useState<'expenses' | 'balances'>('expenses')

  const getEmojiFromString = useGetEmojiFromString(true)

  return (
    <main className='w-full p-8 text-dark max-w-[600px] space-y-6'>
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
        className='w-full flex flex-col'
      >
        <TabsList className='mx-auto'>
          <TabsTrigger className='w-[120px]' value='expenses'>
            Expenses
          </TabsTrigger>
          <TabsTrigger className='w-[120px]' value='balances'>
            Balances
          </TabsTrigger>
        </TabsList>
        <TabsContent className='mt-8' value='expenses'>
          <GroupExpenses />
        </TabsContent>
        <TabsContent className='mt-8' value='balances'>
          Change your password here.
        </TabsContent>
      </Tabs>

      {tabValue === 'expenses' && (
        <Button
          size='icon'
          className='rounded-full absolute bottom-[85px] right-[50%] translate-x-[50%] -translate-y-6 shadow-xl size-10 [&_svg]:size-[24px]'
        >
          <PlusIcon />
        </Button>
      )}
    </main>
  )
}

export default GroupPage
