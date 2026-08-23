'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { Balance } from '@/types/balance-types'

import GroupsContextMenu from './_components/GroupsContextMenu'
import BalancesSection from '@/components/BalancesSection'
import CurrencyProvider from '@/components/CurrencyProvider'
import ExpensesBalancesTabs from '@/components/ExpensesBalancesTabs'
import ExpensesSection from '@/components/ExpensesSection'
import Tooltip from '@/components/Tooltip'

import { useCalculateBalances } from '@/utils/hooks/useCalculateBalances'
import { useGetEmojiFromString } from '@/utils/hooks/useGetEmojiFromString'

import {
  useAddExpense,
  useEditExpense,
  useGetGroup,
  useGetGroupExpenses,
  useRemoveExpense,
  useRemoveParticipant,
} from './hooks'

const GroupPage = () => {
  const { /* loading,  */ /* error,  */ group } = useGetGroup()
  const { loading: loadingExpenses, /* error,  */ expenses, setExpenses } = useGetGroupExpenses()

  const [balances, setBalances] = useState<Balance[]>([])
  const [rounded, setRounded] = useState(false)

  const { addExpense } = useAddExpense({ groupId: group?.id, setExpenses })
  const { removeExpense } = useRemoveExpense({ setExpenses })
  const { editExpense } = useEditExpense({ setExpenses })
  const { removeParticipant } = useRemoveParticipant({ expenses, removeExpense, editExpense })

  const { handleCalculateBalances, disabledBalances } = useCalculateBalances({
    expenses,
    balances,
    setBalances,
    setRounded,
  })

  const getEmojiFromString = useGetEmojiFromString(true)

  const t = useTranslations('GroupPage')

  return (
    <CurrencyProvider currency={group?.currency}>
      <main className='text-dark my-6 flex w-full max-w-[600px] flex-col space-y-6'>
        {group && ( // Handle Group error
          <>
            <div className='relative flex items-center justify-center gap-1'>
              <h2
                className='xs:text-lg text-brand-text flex max-w-[75%] justify-center gap-2 text-center text-base font-bold text-balance'
                id='expenses'
              >
                {getEmojiFromString(group.id)} {group.name}
              </h2>

              {group && (
                <div className='absolute right-2'>
                  <Tooltip content={t('Collaborate in Group!')} align='end' arrow openOnce>
                    <div>
                      <GroupsContextMenu groupId={group.id} hasExpenses={expenses.length > 0} />
                    </div>
                  </Tooltip>
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
                  editExpense={editExpense}
                  removeParticipant={removeParticipant}
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
    </CurrencyProvider>
  )
}

export default GroupPage
