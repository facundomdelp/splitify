'use client'

import { useGetEmojiFromString } from '@/lib/hooks/useGetEmojiFromString'
import { useAddExpense, useGetGroup, useGetGroupExpenses } from './hooks'
import { useState } from 'react'
import ExpensesSection from '../../../../components/ExpensesSection'
import { Balance } from '@/types/balance.types'
import BalancesSection from '@/components/BalancesSection'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { TooltipArrow } from '@radix-ui/react-tooltip'
import ExpensesBalancesTabs from '@/components/ExpensesBalancesTabs'
import { useCalculateBalances } from '@/lib/hooks/useCalculateBalances'
import GroupsContextMenu from './_components/GroupsContextMenu'

const GroupPage = () => {
  const { /* loading,  */ /* error,  */ group } = useGetGroup()
  const { loading: loadingExpenses, /* error,  */ expenses, setExpenses } = useGetGroupExpenses()

  const [balances, setBalances] = useState<Balance[]>([])
  const [rounded, setRounded] = useState(false)

  const { addExpense } = useAddExpense({ groupId: group?.id, expenses, setExpenses })

  const { handleCalculateBalances, disabledBalances } = useCalculateBalances({
    expenses,
    balances,
    setBalances,
    setRounded,
  })

  const getEmojiFromString = useGetEmojiFromString(true)

  return (
    <>
      <main className='w-full my-8 text-dark max-w-[600px] space-y-6 flex flex-col'>
        {group && ( // Handle Group error
          <>
            <div className='flex justify-center items-center gap-2 relative'>
              <h2
                className='font-bold flex flex-nowrap gap-2 justify-center text-green-800 text-base xs:text-lg'
                id='expenses'
              >
                {getEmojiFromString(group.id)} {group.name}
              </h2>
              {/* <PencilIcon className='size-[16px] text-gray-500' /> */}

              {group && (
                <div className='absolute right-2'>
                  <TooltipProvider>
                    <Tooltip defaultOpen>
                      <TooltipTrigger asChild>
                        <div>
                          <GroupsContextMenu groupId={group.id} />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className='text-[10px] font-semibold mr-2' align='end' sideOffset={-4}>
                        <TooltipArrow fill='green' />
                        Share Group!
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
            </div>

            <ExpensesBalancesTabs
              onBalancesClick={handleCalculateBalances}
              disabledBalances={disabledBalances || loadingExpenses}
            >
              {[
                <ExpensesSection
                  key='expenses-section'
                  expenses={expenses}
                  setExpenses={setExpenses}
                  loadingExpenses={loadingExpenses}
                  addExpenseAction={addExpense}
                />,
                <BalancesSection
                  key='balances-section'
                  balances={balances}
                  rounded={rounded}
                  setRounded={setRounded}
                />,
              ]}
            </ExpensesBalancesTabs>
          </>
        )}
      </main>
    </>
  )
}

export default GroupPage
