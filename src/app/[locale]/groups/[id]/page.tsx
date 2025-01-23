'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { Balance } from '@/types/balance.types'

import GroupsContextMenu from './_components/GroupsContextMenu'
import BalancesSection from '@/components/BalancesSection'
import ExpensesBalancesTabs from '@/components/ExpensesBalancesTabs'
import ExpensesSection from '@/components/ExpensesSection'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import { CustomError } from '@/utils/errors/CustomErrors'
import { useCalculateBalances } from '@/utils/hooks/useCalculateBalances'
import { useGetEmojiFromString } from '@/utils/hooks/useGetEmojiFromString'

import { useAddExpense, useGetGroup, useGetGroupExpenses } from './hooks'

import { TooltipArrow } from '@radix-ui/react-tooltip'

const GroupPage = () => {
  const { /* loading,  */ /* error,  */ group } = useGetGroup()
  const { loading: loadingExpenses, /* error,  */ expenses, setExpenses } = useGetGroupExpenses()

  const [balances, setBalances] = useState<Balance[]>([])
  const [rounded, setRounded] = useState(false)

  const { addExpense } = useAddExpense({ groupId: group?.id, setExpenses })

  const removeExpense = async (id: string) => {
    const remainingExpenses = expenses.filter(({ id: expenseId }) => expenseId !== id)
    setExpenses(remainingExpenses)

    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        throw new CustomError(response.status)
      }
    } catch {
      // use an optimistic removing
    }
  }

  const { handleCalculateBalances, disabledBalances } = useCalculateBalances({
    expenses,
    balances,
    setBalances,
    setRounded,
  })

  const getEmojiFromString = useGetEmojiFromString(true)

  const t = useTranslations('GroupPage')

  return (
    <>
      <main className='w-full my-6 text-dark max-w-[600px] space-y-6 flex flex-col'>
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
                        {t('Share Group!')}
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
                  loadingExpenses={loadingExpenses}
                  addExpense={addExpense}
                  removeExpense={removeExpense}
                  modalForm
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
