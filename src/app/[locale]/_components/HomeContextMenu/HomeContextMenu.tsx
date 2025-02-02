import React, { useState } from 'react'

import { useTranslations } from 'next-intl'

import { Balance } from '@/types/balance-types'
import { Expense } from '@/types/expense-types'

import ConfirmationModal from '@/components/ConfirmationModal'
import ContextMenu from '@/components/ContextMenu'
import { ContextMenuItem } from '@/components/ContextMenu/ContextMenu'
import { Badge } from '@/components/ui/badge'

import { Wand } from 'lucide-react'

interface Props {
  expenses: Expense[]
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
  setBalances: React.Dispatch<React.SetStateAction<Balance[]>>
  convertIntoGroup: (expenses: Expense[]) => void
}

const HomeContextMenu = ({ expenses, convertIntoGroup }: Props) => {
  const [openTurnIntoGroupConfirmationModal, setOpenTurnIntoGroupConfirmationModal] = useState(false)

  const t = useTranslations('HomeContextMenu')

  return (
    <>
      <ConfirmationModal
        key='turn-into-group-modal'
        open={openTurnIntoGroupConfirmationModal}
        onOpenChange={setOpenTurnIntoGroupConfirmationModal}
        title={<>{t('Do you want to turn these expenses into a ✈️ Group?')}</>}
        description={t('By turning it into a group, you can share a link so others can collaborate easily')}
        onConfirm={() => convertIntoGroup(expenses)}
      />

      <ContextMenu>
        <ContextMenuItem onClick={() => setOpenTurnIntoGroupConfirmationModal(true)} disabled={expenses.length === 0}>
          <Wand /> {t('Turn into a Group ✈️')}
          <Badge className='pointer-events-none my-auto flex text-nowrap rounded-lg px-[6px] text-[6px] uppercase leading-[0.6rem] opacity-70'>
            Beta
          </Badge>
        </ContextMenuItem>
      </ContextMenu>
    </>
  )
}

export default HomeContextMenu
