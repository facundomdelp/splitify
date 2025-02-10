'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

import ConfirmationModal from '@/components/ConfirmationModal'
import { Button } from '@/components/ui/button'

import { Eraser } from 'lucide-react'

interface Props {
  handleResetExpenses: () => void
  className?: string
  disabled?: boolean
}

const ResetExpensesButton = ({ handleResetExpenses, disabled, className }: Props) => {
  const [openModal, setOpenModal] = useState(false)

  const t = useTranslations('ResetExpenses')

  return (
    <>
      <ConfirmationModal
        key='reset-modal'
        open={openModal}
        onOpenChange={setOpenModal}
        title={<>{t('Are you sure you want to reset the expenses list?')}</>}
        onConfirm={handleResetExpenses}
        destructive
      />

      <Button
        className={cn('', className)}
        variant='destructive'
        onClick={() => setOpenModal(true)}
        disabled={disabled}
      >
        <Eraser /> {t('Reset')}
      </Button>
    </>
  )
}

export default ResetExpensesButton
