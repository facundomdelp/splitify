'use client'

import { formatAmount } from '@/lib/functions/formatAmount'
import { CleanTransfers } from './ClearTransfers'
import CopyToClipboard from '@/components/CopyToClipboard'
import { useCopyString } from './hooks'
import { Transfer } from '@/types/Transfer'
import { useGetEmojiFromString } from '@/lib/hooks/useGetEmojiFromString'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Switch } from '@/components/ui/switch'

interface Props {
  transfers: Transfer[]
  setTransfers: React.Dispatch<React.SetStateAction<Transfer[]>>
  onClean?: () => void
}

const Transfers = ({ transfers, setTransfers, onClean }: Props) => {
  const [rounded, setRounded] = useState(transfers.some((transfer) => transfer.amount % 1 === 0))

  const t = useTranslations('Transfers')

  const copyString = useCopyString({ transfers, rounded })
  const getEmojiFromString = useGetEmojiFromString()

  return (
    <>
      <section className='text-sm min-w-0'>
        <div className='flex items-center gap-2'>
          <h2 className='text-lg font-bold'>{t('Balances')}</h2>

          <div className='ml-auto flex gap-1'>
            <Switch className='scale-75' onCheckedChange={setRounded} checked={rounded} />
            <p className='text-[12px]'>Redondear</p>
          </div>
        </div>

        <ul className='mt-4 flex flex-col gap-3 min-w-0'>
          {transfers.map((transfer, index) => (
            <li key={index} className='flex items-center min-w-0 flex-wrap'>
              <div className='flex items-center min-w-0 gap-1 mr-1'>
                <p className='mr-1'>{getEmojiFromString(transfer.debtor)}</p>
                <p className='text-ellipsis whitespace-nowrap overflow-hidden min-w-0'>{transfer.debtor}</p>
                <p className='whitespace-nowrap'>{t('owes')}</p>
                <strong className='font-semibold whitespace-nowrap'>
                  ${formatAmount(transfer.amount, rounded ? 0 : 2)}
                </strong>
              </div>
              <div className='flex items-center min-w-0 gap-1'>
                <p className='whitespace-nowrap'>{t('to')}</p>
                <p className='text-ellipsis whitespace-nowrap overflow-hidden min-w-0'>{transfer.creditor}</p>
                <p className='mr-1'>{getEmojiFromString(transfer.creditor)}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className='mt-auto flex gap-4'>
        <CleanTransfers setTransfers={setTransfers} onClean={onClean} className='flex-1 basis-28' />
        <CopyToClipboard copyString={copyString} />
      </section>
    </>
  )
}

export default Transfers
