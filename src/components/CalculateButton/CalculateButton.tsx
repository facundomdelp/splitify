import React from 'react'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import Spinner from '@/components/ui/spinner'

interface Props {
  disabled?: boolean
  calculating?: boolean
  onClick?: () => void
}

const CalculateButton = ({ disabled, calculating, onClick }: Props) => {
  const t = useTranslations('CalculateButton')

  return (
    <section className='mx-4 mt-auto flex'>
      <Button className='flex-1' onClick={onClick} disabled={disabled}>
        {!calculating ? t('Calculate Balances') : <Spinner />}
      </Button>
    </section>
  )
}

export default CalculateButton
