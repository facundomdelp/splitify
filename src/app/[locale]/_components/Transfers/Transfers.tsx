'use client'

import { formatAmount } from '@/lib/functions/formatAmount'
import { CleanTransfers } from './ClearTransfers'
import CopyToClipboard from '@/components/CopyToClipboard'
import { useCopyString } from './hooks'
import { Transfer } from '@/types/Transfer'
import { useGetEmojiFromString } from '@/lib/hooks/useGetEmojiFromString'
import { Button } from '@/components/ui/button'
import ReduceDecimal from '@/components/icons/ReduceDecimal'
import IncreaseDecimal from '@/components/icons/IncreaseDecimal'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

interface Props {
  transfers: Transfer[]
  setTransfers: React.Dispatch<React.SetStateAction<Transfer[]>>
  onClean?: () => void
}

const Transfers = ({ transfers, setTransfers, onClean }: Props) => {
  const [fractionDigits, setFractionDigits] = useState(2)

  const t = useTranslations('Transfers')

  const copyString = useCopyString({ transfers, fractionDigits })
  const getEmojiFromString = useGetEmojiFromString()

  return (
    <>
      <section className='text-sm min-w-0'>
        <div className='flex items-center gap-2'>
          <h2 className='text-lg font-bold'>{t('Balances')}</h2>
          <Button
            size='icon'
            variant='ghost'
            className='h-[20px] w-[25px] gap-[3px] ml-auto'
            onClick={() => setFractionDigits(fractionDigits - 1)}
            disabled={fractionDigits === 0}
          >
            <ReduceDecimal className='width-[10px]' />
          </Button>
          <Button
            size='icon'
            variant='ghost'
            className='h-[20px] w-[25px] gap-[3px]'
            onClick={() => setFractionDigits(fractionDigits + 1)}
            disabled={fractionDigits === 2}
          >
            <IncreaseDecimal className='width-[10px]' />
          </Button>
        </div>

        <ul className='mt-4 flex flex-col gap-3 min-w-0'>
          {transfers.map((transfer, index) => (
            <li key={index} className='flex items-center min-w-0 flex-wrap'>
              <div className='flex items-center min-w-0 gap-1 mr-1'>
                <p className='mr-1'>{getEmojiFromString(transfer.debtor)}</p>
                <p className='text-ellipsis whitespace-nowrap overflow-hidden min-w-0'>{transfer.debtor}</p>
                <p className='whitespace-nowrap'>{t('owes')}</p>
                <strong className='font-semibold whitespace-nowrap'>
                  ${formatAmount(transfer.amount, fractionDigits)}
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
