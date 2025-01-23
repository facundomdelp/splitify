import React from 'react'

import { Balance } from '@/types/balance.types'

import Balances from '@/components/Balances'
import CopyToClipboard from '@/components/CopyToClipboard'

import { useCopyString } from '@/utils/hooks/useCopyString'

interface Props {
  balances: Balance[]
  rounded: boolean
  setRounded: React.Dispatch<React.SetStateAction<boolean>>
}

const BalancesSection = ({ balances, rounded, setRounded }: Props) => {
  const copyString = useCopyString({ balances, rounded })

  return (
    <section className='flex-1 flex flex-col gap-4 justify-between mx-4'>
      <Balances balances={balances} rounded={rounded} setRounded={setRounded} />
      <CopyToClipboard copyString={copyString} className='mx-4' />
    </section>
  )
}

export default BalancesSection
