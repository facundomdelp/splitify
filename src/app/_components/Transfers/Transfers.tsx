'use client'

import { formatAmount } from '@/lib/functions/formatAmount'
import { CleanTransfers } from './ClearTransfers'
import CopyToClipboard from '@/components/CopyToClipboard'
import { useCopyString } from './hooks'
import { Transfer } from '@/types/Transfer'
import { useTranslate } from '@/lib/hooks/useTranslate'
import { Translations } from '@/types/Common'
import { useGetEmojiFromString } from '@/lib/hooks/useGetEmojiFromString'
// import { Button } from '@/components/ui/button'
// import { ArrowLeft, ArrowRight } from 'lucide-react'

interface Props {
  transfers: Transfer[]
  setTransfers: React.Dispatch<React.SetStateAction<Transfer[]>>
  onClean?: () => void
}

const Transfers = ({ transfers, setTransfers, onClean }: Props) => {
  // const [fractionDigits, setFractionDigits] = useState(2)

  const t = useTranslate(translations)

  const copyString = useCopyString({ transfers })
  const getEmojiFromString = useGetEmojiFromString()

  return (
    <>
      <section className='text-sm min-w-0'>
        <div className='flex items-center gap-2'>
          <h2 className='text-lg font-bold'>{t('Balances')}</h2>
          {/* <Button
            size='icon'
            variant='outline'
            className='h-[20px] w-[45px] gap-[3px] text-[8px] text-gray-500 ml-auto'
          >
            0.1
            <ArrowLeft />
          </Button>
          <Button size='icon' variant='outline' className='h-[20px] w-[45px] gap-[3px] text-gray-500 text-[8px]'>
            <ArrowRight />
            0.01
          </Button> */}
        </div>

        <ul className='mt-4 flex flex-col gap-3 min-w-0'>
          {transfers.map((transfer, index) => (
            <li key={index} className='flex items-center min-w-0 flex-wrap'>
              <div className='flex items-center min-w-0 gap-1 mr-1'>
                <p className='mr-1'>{getEmojiFromString(transfer.debtor)}</p>
                <p className='text-ellipsis whitespace-nowrap overflow-hidden min-w-0'>{transfer.debtor}</p>
                <p className='whitespace-nowrap'>{t('owes')}</p>
                <strong className='font-semibold whitespace-nowrap'>${formatAmount(transfer.amount)}</strong>
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

const translations = {
  Balances: {
    es: 'Saldos',
  },
  owes: {
    es: 'debe',
  },
  to: {
    es: 'a',
  },
} satisfies Translations
