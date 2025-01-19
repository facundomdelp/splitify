'use client'

import { useGetEmojiFromString } from '@/lib/hooks/useGetEmojiFromString'
import { useCalculateGroupBalances, useGetGroup, useGetGroupExpenses } from './hooks'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEffect, useState } from 'react'
import GroupExpenses from './_components/GroupExpenses'
import { Balance } from '@/types/balance.types'
import GroupBalances from './_components/GroupBalances'
import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import Modal from '@/components/Modal'
import { useLocale } from 'next-intl'
import { copyToClipboard } from '@/lib/functions/copyToClipboard'

const GroupPage = () => {
  const { /* loading,  */ /* error,  */ group } = useGetGroup()
  const { /* loading,  */ /* error,  */ expenses, setExpenses } = useGetGroupExpenses()

  const [balances, setBalances] = useState<Balance[]>([])
  const [rounded, setRounded] = useState(false)
  const [tabValue, setTabValue] = useState<'expenses' | 'balances'>('expenses')

  const [isButtonOutlined, setIsButtonOutlined] = useState(false)
  const [openShareModal, setOpenShareModal] = useState(false)

  const { handleCalculateGroupBalances } = useCalculateGroupBalances({ expenses, balances, setBalances, setRounded })

  const getEmojiFromString = useGetEmojiFromString(true)

  const locale = useLocale()

  useEffect(() => {
    setTimeout(() => {
      setIsButtonOutlined(true)
    }, 4000)
  }, [])

  return (
    <>
      <main className='w-full mt-8 mb-12 text-dark max-w-[600px] space-y-6 flex flex-col relative'>
        {group && ( // Handle Group error
          <>
            <div className='flex justify-center items-center gap-2'>
              <h2 className='text-lg font-bold flex flex-nowrap gap-2 justify-center text-green-800' id='expenses'>
                {getEmojiFromString(group.id)} {group.name}
              </h2>
              {/* <PencilIcon className='size-[16px] text-gray-500' /> */}
            </div>

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
                <GroupExpenses groupId={group.id} expenses={expenses} setExpenses={setExpenses} />
              </TabsContent>
              <TabsContent className='mt-8 flex-1 flex flex-col' value='balances'>
                <GroupBalances balances={balances} rounded={rounded} setRounded={setRounded} />
              </TabsContent>
            </Tabs>

            {group && (
              <Button
                size='icon'
                variant={isButtonOutlined ? 'outline' : undefined}
                className={cn(
                  'rounded-full absolute -bottom-8 right-1/2 translate-x-[50%] shadow-lg transition-all',
                  'hover:border-green-600 hover:text-green-600 hover:bg-green-50',
                  isButtonOutlined ? 'border-green-600 text-green-600 bg-green-50' : '',
                )}
                onClick={() => setOpenShareModal(true)}
              >
                <Share2 />
              </Button>
            )}
          </>
        )}
      </main>

      {group && (
        <Modal open={openShareModal} setOpen={setOpenShareModal} title={'Share Group'} closeOnBackdropClick>
          <div className='space-y-3 text-center'>
            <p className='text-sm'>{'Copy this link and share it with your friends!'} </p>
            <code
              title='Copy this link'
              className='text-[10px] text-wrap p-2 bg-gray-50 flex items-center justify-center'
            >{`https://splitify.me/${locale}/groups/${group.id}`}</code>
            <p className='text-[10px]'>{'Your friends can easily add expenses to this group.'} </p>
            <Button onClick={() => copyToClipboard(`https://splitify.me/${locale}/groups/${group.id}`)}>Copy</Button>
          </div>
        </Modal>
      )}
    </>
  )
}

export default GroupPage
