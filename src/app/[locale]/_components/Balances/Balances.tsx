'use client'

import { formatAmount } from '@/lib/functions/formatAmount'
import { ResetBalances } from './ResetBalances'
import CopyToClipboard from '@/components/CopyToClipboard'
import { useCopyString } from './hooks'
import { Balance } from '@/types/Balance'
import { useGetEmojiFromString } from '@/lib/hooks/useGetEmojiFromString'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Switch } from '@/components/ui/switch'
import { CircleDollarSign } from 'lucide-react'

interface Props {
  balances: Balance[]
  setBalances: React.Dispatch<React.SetStateAction<Balance[]>>
  onClean?: () => void
}

const Balances = ({ balances, setBalances, onClean }: Props) => {
  const [rounded, setRounded] = useState(balances.some((balance) => balance.amount % 1 === 0))

  const t = useTranslations('Balances')

  const copyString = useCopyString({ balances, rounded })
  const getEmojiFromString = useGetEmojiFromString()

  return (
    <>
      <section className='text-sm min-w-0'>
        <div className='flex items-center gap-2'>
          <h2 className='text-lg font-bold flex flex-nowrap gap-2 items-center' id='balances'>
            <CircleDollarSign className='size-[22px] text-green-700' />
            {t('Balances')}
          </h2>

          <div className='ml-auto flex gap-1'>
            <Switch className='scale-75' onCheckedChange={setRounded} checked={rounded} />
            <p className='text-[12px]'>{t('Round')}</p>
          </div>
        </div>

        <ul className='mt-4 flex flex-col gap-3 min-w-0'>
          {balances.map((balance, index) => (
            <li key={index} className='flex items-center min-w-0 flex-wrap'>
              <div className='flex items-center min-w-0 gap-1 mr-1'>
                <p className='mr-1'>{getEmojiFromString(balance.debtor)}</p>
                <p className='text-ellipsis whitespace-nowrap overflow-hidden min-w-0'>{balance.debtor}</p>
                <p className='whitespace-nowrap'>{t('owes')}</p>
                <strong className='font-semibold whitespace-nowrap'>
                  ${formatAmount(balance.amount, rounded ? 0 : 2)}
                </strong>
              </div>
              <div className='flex items-center min-w-0 gap-1'>
                <p className='whitespace-nowrap'>{t('to')}</p>
                <p className='text-ellipsis whitespace-nowrap overflow-hidden min-w-0'>{balance.creditor}</p>
                <p className='mr-1'>{getEmojiFromString(balance.creditor)}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className='mt-auto flex gap-4'>
        <ResetBalances setBalances={setBalances} onClean={onClean} className='flex-1 basis-28' />
        <CopyToClipboard copyString={copyString} />
      </section>
    </>
  )
}

export default Balances
