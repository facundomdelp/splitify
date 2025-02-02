import React from 'react'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import Spinner from '@/components/ui/spinner'

interface Props {
  disabled?: boolean
  calculating?: boolean
  onClick?: () => void
  className?: string
}

const CalculateButton = ({ disabled, calculating, onClick, className }: Props) => {
  const t = useTranslations('CalculateButton')

  return (
    <Button className={className} onClick={onClick} disabled={disabled}>
      {!calculating ? t('Calculate Balances') : <Spinner />}
    </Button>
  )
}

export default CalculateButton
