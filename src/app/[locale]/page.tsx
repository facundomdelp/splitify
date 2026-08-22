'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import HomeContextMenu from './_components/HomeContextMenu'
import TurnIntoGroupCta from './_components/TurnIntoGroupCta'
import BalancesSection from '@/components/BalancesSection'
import ConfirmationModal from '@/components/ConfirmationModal'
import ExpensesBalancesTabs from '@/components/ExpensesBalancesTabs'
import ExpensesSection from '@/components/ExpensesSection'
import Spinner from '@/components/ui/spinner'

import { useSetBalances } from '@/store/balances-store'
import { useSetExpenses } from '@/store/expenses-store'

import { getParticipantNames } from '@/utils/functions/getParticipants'
import { useCalculateBalances } from '@/utils/hooks/useCalculateBalances'

import { X } from 'lucide-react'

import { useAddExpense, useConvertIntoGroup, useHideTitleBanner, useRemoveExpense } from './hooks'

const TURN_INTO_GROUP_THRESHOLD = 6

export default function Home() {
  const [expenses, setExpenses] = useSetExpenses()
  const [balances, setBalances] = useSetBalances()
  const [rounded, setRounded] = useState(false)
  const [openTurnIntoGroupModal, setOpenTurnIntoGroupModal] = useState(false)

  const { hideTitleBanner, handleCloseTitle } = useHideTitleBanner()

  const { addExpense } = useAddExpense({ setExpenses })
  const { removeExpense } = useRemoveExpense({ setExpenses })

  const { handleCalculateBalances, disabledBalances } = useCalculateBalances({
    expenses,
    balances,
    setBalances,
    setRounded,
  })
  const { convertIntoGroup, convertToGroupState } = useConvertIntoGroup({ setExpenses, setBalances })

  const handleResetExpenses = () => {
    setExpenses([])
    setBalances([])
  }

  const canTurnIntoGroup = getParticipantNames(expenses).length >= TURN_INTO_GROUP_THRESHOLD

  const t = useTranslations('Home')
  const tGroup = useTranslations('HomeContextMenu')

  return (
    <main className='text-dark relative my-6 flex w-full max-w-[600px] flex-col space-y-6'>
      {!hideTitleBanner && (
        <article className='relative mx-4 rounded-md border border-green-600 bg-green-50 p-3'>
          <X
            className='absolute top-2 right-2 size-[18px] cursor-pointer text-gray-500 hover:text-gray-700'
            onClick={handleCloseTitle}
          />
          <h1 className='mt-0 mr-5 mb-1 text-sm font-bold'>{t('Simplify your group expenses with Splitify 🤑')}</h1>
          <p className='text-xs text-slate-500'>
            <strong className='font-semibold'>{t('💸 How does it work?')}</strong>{' '}
            {t("Just enter each participant's name and how much they spent")}
          </p>
        </article>
      )}

      <ExpensesBalancesTabs
        onBalancesClick={handleCalculateBalances}
        disabled={convertToGroupState.loading}
        disabledBalances={disabledBalances}
        disabledReset={!expenses.length}
        onResetExpenses={handleResetExpenses}
        contextMenu={
          !convertToGroupState.loading ? (
            <HomeContextMenu disabled={expenses.length === 0} onTurnIntoGroup={() => setOpenTurnIntoGroupModal(true)} />
          ) : (
            <Spinner className='w-fit px-4 text-green-600' />
          )
        }
      >
        {[
          <div key='expenses-section' className='flex min-w-0 flex-1 flex-col gap-4'>
            <ExpensesSection
              expenses={expenses}
              removeExpense={removeExpense}
              addExpense={addExpense}
              disabled={convertToGroupState.loading}
            />

            {expenses.length > 0 && (
              <TurnIntoGroupCta
                visible={canTurnIntoGroup}
                onClick={() => setOpenTurnIntoGroupModal(true)}
                disabled={convertToGroupState.loading}
              />
            )}
          </div>,
          <BalancesSection key='balances-section' balances={balances} rounded={rounded} setRounded={setRounded} />,
        ]}
      </ExpensesBalancesTabs>

      <ConfirmationModal
        open={openTurnIntoGroupModal}
        onOpenChange={setOpenTurnIntoGroupModal}
        title={tGroup('Do you want to turn these expenses into a ✈️ Group?')}
        description={tGroup('By turning it into a group, you can share a link so others can collaborate easily')}
        onConfirm={() => convertIntoGroup(expenses)}
      />
    </main>
  )
}
