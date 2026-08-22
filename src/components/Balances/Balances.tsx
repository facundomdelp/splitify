'use client'

import { useTranslations } from 'next-intl'

import { Balance } from '@/types/balance-types'

import Amount from '@/components/Amount'
import { Switch } from '@/components/ui/switch'

import { useGetEmojiFromString } from '@/utils/hooks/useGetEmojiFromString'

import { CircleDollarSign } from 'lucide-react'

interface Props {
  balances: Balance[]
  rounded: boolean
  setRounded: React.Dispatch<React.SetStateAction<boolean>>
}

const Balances = ({ balances, rounded, setRounded }: Props) => {
  const getEmojiFromString = useGetEmojiFromString()

  const t = useTranslations('Balances')

  return (
    <>
      <section className='min-w-0 text-sm'>
        <div className='flex items-center gap-2'>
          <h2 className='flex flex-nowrap items-center gap-2 text-lg font-bold' id='balances'>
            <CircleDollarSign className='size-[22px] text-green-700' />
            {t('Balances')}
          </h2>

          <div className='ml-auto flex gap-1'>
            <Switch className='scale-75' onCheckedChange={setRounded} checked={rounded} />
            <p className='text-[12px]'>{t('Round')}</p>
          </div>
        </div>

        <ul className='mt-4 flex min-w-0 flex-col gap-3'>
          {balances.map((balance, index) => (
            <li key={index} className='flex min-w-0 flex-wrap items-center'>
              <div className='mr-1 flex min-w-0 items-center gap-1'>
                <p className='mr-1 w-[20px] text-center'>{getEmojiFromString(balance.debtor)}</p>
                <p className='min-w-0 overflow-hidden text-ellipsis whitespace-nowrap'>{balance.debtor}</p>
                <p className='whitespace-nowrap'>{t('owes')}</p>
                <strong className='font-semibold whitespace-nowrap'>
                  $<Amount fractionDigits={rounded ? 0 : 2}>{balance.amount}</Amount>
                </strong>
              </div>
              <div className='flex min-w-0 items-center gap-1'>
                <p className='whitespace-nowrap'>{t('to')}</p>
                <p className='min-w-0 overflow-hidden text-ellipsis whitespace-nowrap'>{balance.creditor}</p>
                <p className='w-[20px] text-center'>{getEmojiFromString(balance.creditor)}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default Balances
