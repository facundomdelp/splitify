'use client'

import { formatAmount } from '@/lib/functions/formatAmount'
import { getEmojiFromString } from '@/lib/functions/getEmojiFromString'
import { Transfer } from '@/types'
import { CleanTransfers } from './CleanTransfers'
import CopyToClipboard from '@/components/CopyToClipboard'
import { useCopyString } from './hooks'
import LanguageProvider, { LanguageContext } from '@/context/LanguageContext'
import { useContext } from 'react'

interface Props {
  transfers: Transfer[]
  setTransfers: React.Dispatch<React.SetStateAction<Transfer[]>>
  onClean?: () => void
}

const Transfers = ({ transfers, setTransfers, onClean }: Props) => {
  const { language: l } = useContext(LanguageContext)

  const copyString = useCopyString({ transfers })

  return (
    <>
      <section className='text-sm min-w-0'>
        <div className='flex gap-5 items-center'>
          <h2 className='text-lg font-bold'>{t('Balances', l)}</h2>
        </div>

        <ul className='mt-4 flex flex-col gap-3 min-w-0'>
          {transfers.map((transfer, index) => (
            <li key={index} className='flex items-center min-w-0 flex-wrap'>
              <div className='flex items-center min-w-0 gap-1 mr-1'>
                <p className='mr-1'>{getEmojiFromString(transfer.debtor)}</p>
                <p className='text-ellipsis whitespace-nowrap overflow-hidden min-w-0'>{transfer.debtor}</p>
                <p className='whitespace-nowrap'>{t('owes', l)}</p>
                <strong className='font-semibold whitespace-nowrap'>${formatAmount(transfer.amount)}</strong>
              </div>
              <div className='flex items-center min-w-0 gap-1'>
                <p className='whitespace-nowrap'>{t('to', l)}</p>
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

const TRANSLATIONS = {
  Balances: {
    es: 'Saldos',
  },
  owes: {
    es: 'debe',
  },
  to: {
    es: 'a',
  },
}

function t(key: keyof typeof TRANSLATIONS, lang: LanguageProvider['language']) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return TRANSLATIONS[key][lang] || key
}
