'use client'

import { Balance } from '@/types/balance-types'

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
    <section className='flex flex-1 flex-col justify-between gap-4'>
      <Balances balances={balances} rounded={rounded} setRounded={setRounded} />
      <CopyToClipboard copyString={copyString} />
    </section>
  )
}

export default BalancesSection
