'use client'

import { useGetEmojiFromString } from '@/lib/hooks/useGetEmojiFromString'
import { useCalculateGroupBalances, useGetGroup, useGetGroupExpenses } from './hooks'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import ExpensesSection from '../../../../components/ExpensesSection'
import { Balance } from '@/types/balance.types'
import BalancesSection from '@/components/BalancesSection'
import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import Modal from '@/components/Modal'
import { useLocale } from 'next-intl'
import CopyToClipboard from '@/components/CopyToClipboard'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { TooltipArrow } from '@radix-ui/react-tooltip'
import { generateId } from '@/lib/functions/generateId'
import { CustomError } from '@/lib/errors/CustomErrors'

const GroupPage = () => {
  const { /* loading,  */ /* error,  */ group } = useGetGroup()
  const { loading: loadingExpenses, /* error,  */ expenses, setExpenses } = useGetGroupExpenses()

  const [balances, setBalances] = useState<Balance[]>([])
  const [rounded, setRounded] = useState(false)
  const [tabValue, setTabValue] = useState<'expenses' | 'balances'>('expenses')

  const [openShareModal, setOpenShareModal] = useState(false)

  const { handleCalculateGroupBalances } = useCalculateGroupBalances({ expenses, balances, setBalances, setRounded })

  const getEmojiFromString = useGetEmojiFromString(true)

  const locale = useLocale()

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
    if (!group?.id) return

    const expenseUiId = generateId()
    const newExpenses = [...(expenses ?? []), { id: expenseUiId, optimistic: true, name, amount, title, date }]

    setExpenses(newExpenses)

    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          groupId: group.id,
          name,
          amount,
          title,
          date,
        }),
      })

      if (!response.ok) {
        throw new CustomError(response.status)
      }

      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) => (expense.id === expenseUiId ? { ...expense, optimistic: false } : expense)),
      )
    } catch {
      // Put in red with a warning, a tooltip and a try again button
    }
  }

  return (
    <>
      {group && (
        <Modal open={openShareModal} setOpen={setOpenShareModal} title={'Share Group'} closeOnBackdropClick>
          <div className='space-y-3 text-center'>
            <p className='text-sm'>{'🤑 Copy this link and share it with your friends!  💸'} </p>
            <code
              title='Copy this link'
              className='text-[10px] text-wrap p-2 bg-gray-50 flex items-center justify-center'
            >{`https://splitify.me/${locale}/groups/${group.id}`}</code>
            <p className='text-[10px] pb-3'>{'Your friends can easily add expenses to this group.'} </p>
            <CopyToClipboard
              onClick={() => setOpenShareModal(false)}
              copyString={`https://splitify.me/${locale}/groups/${group.id}`}
            />
          </div>
        </Modal>
      )}

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
                <TooltipProvider>
                  <Tooltip defaultOpen>
                    <TooltipTrigger asChild>
                      <Button
                        size='icon'
                        variant='ghost'
                        className={cn(
                          'rounded-full absolute right-2 transition-all mt-[0!important] flex text-gray-500 px-3',
                        )}
                        onClick={() => setOpenShareModal(true)}
                      >
                        <Share2 />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className='text-[10px] font-semibold mr-2' sideOffset={-4}>
                      <TooltipArrow fill='green' />
                      Share Group!
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
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
                <TabsTrigger
                  className='w-[120px]'
                  value='balances'
                  onClick={handleCalculateGroupBalances}
                  disabled={
                    loadingExpenses ||
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
                <ExpensesSection
                  expenses={expenses}
                  setExpenses={setExpenses}
                  loadingExpenses={loadingExpenses}
                  addExpenseAction={addExpense}
                />
              </TabsContent>
              <TabsContent className='mt-8 flex-1 flex flex-col' value='balances'>
                <BalancesSection balances={balances} rounded={rounded} setRounded={setRounded} />
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
    </>
  )
}

export default GroupPage
