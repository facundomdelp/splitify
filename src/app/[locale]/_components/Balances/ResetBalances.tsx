'use client'

import ConfirmationModal from '@/components/ConfirmationModal'
import { Button } from '@/components/ui/button'
import { Balance } from '@/types/Balance'
import { Eraser } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface Props {
  setBalances: React.Dispatch<React.SetStateAction<Balance[]>>
  onClean?: () => void
  className?: string
}

export const ResetBalances = ({ setBalances, onClean, className }: Props) => {
  const handleOnConfirm = () => {
    onClean?.()
    setBalances([])
  }

  const t = useTranslations('ResetBalances')

  return (
    <ConfirmationModal
      title={t('Are you sure you want to clear the balances list?')}
      onConfirm={handleOnConfirm}
      className={className}
      destructive
    >
      <Button className='w-full' variant='destructive'>
        <Eraser className='size-[18px]' />
        <p>{t('Reset')}</p>
      </Button>
    </ConfirmationModal>
  )
}
