import ConfirmationModal from '@/components/ConfirmationModal'
import ContextMenu from '@/components/ContextMenu'
import { ContextMenuItem } from '@/components/ContextMenu/ContextMenu'
import { Badge } from '@/components/ui/badge'
import { Balance } from '@/types/balance.types'
import { Expense } from '@/types/expense.types'
import { Eraser, Wand } from 'lucide-react'
import React, { useState } from 'react'

interface Props {
  expenses: Expense[]
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
  setBalances: React.Dispatch<React.SetStateAction<Balance[]>>
  convertIntoGroup: (expenses: Expense[]) => void
}

const HomeContextMenu = ({ expenses, setExpenses, setBalances, convertIntoGroup }: Props) => {
  const [openTurnIntoGroupConfirmationModal, setOpenTurnIntoGroupConfirmationModal] = useState(false)
  const [openResetConfirmationModal, setOpenResetConfirmationModal] = useState(false)

  const handleResetExpenses = () => {
    setExpenses([])
    setBalances([])
  }

  return (
    <>
      <ConfirmationModal
        key='turn-into-group-modal'
        open={openTurnIntoGroupConfirmationModal}
        onOpenChange={setOpenTurnIntoGroupConfirmationModal}
        title={<>¿Quieres convertir estas expensas en un ✈️ Grupo?</>}
        description='Al convertirlo en un grupo, podrás compartir un enlace para que otros colaboren fácilmente.'
        onConfirm={() => convertIntoGroup(expenses)}
      />

      <ConfirmationModal
        key='reset-modal'
        open={openResetConfirmationModal}
        onOpenChange={setOpenResetConfirmationModal}
        title={<>Are you sure you want to reset the expenses list?</>}
        onConfirm={handleResetExpenses}
        destructive
      />

      <ContextMenu>
        <ContextMenuItem onClick={() => setOpenTurnIntoGroupConfirmationModal(true)} disabled={expenses.length === 0}>
          <Wand /> Turn into a Group ✈️
          <Badge className='my-auto px-[6px] uppercase text-nowrap opacity-70 rounded-lg text-[6px] flex leading-[0.6rem] pointer-events-none'>
            Beta
          </Badge>
        </ContextMenuItem>
        <ContextMenuItem onClick={() => setOpenResetConfirmationModal(true)} disabled={expenses.length === 0}>
          <Eraser /> Reset Expenses
        </ContextMenuItem>
      </ContextMenu>
    </>
  )
}

export default HomeContextMenu
