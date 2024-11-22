import { formatAmount } from '@/lib/functions/formatAmount'
import { getEmojiFromString } from '@/lib/functions/getEmojiFromString'
import { CheckIcon, Clipboard } from 'lucide-react'
import { Transfer } from '@/types'
import { useCopyTransfersToClipboard } from './hooks'

interface Props {
  transfers: Transfer[]
}

const Transfers = ({ transfers }: Props) => {
  const { handleCopyToClipboard, copied } = useCopyTransfersToClipboard({ transfers })

  return (
    <>
      <section className='text-sm min-w-0'>
        <div className='flex gap-5 items-center'>
          <h2 className='text-lg font-bold'>Saldos</h2>
          {copied ? (
            <div className='flex gap-1 items-center ml-auto'>
              <CheckIcon className='size-[18px] ml-auto' />
              <p className='text-sm font-medium'>¡Copiado!</p>
            </div>
          ) : (
            <button className='flex gap-1 items-center ml-auto' onClick={handleCopyToClipboard}>
              <Clipboard className='size-[18px] ml-auto' />
              <p className='text-sm font-medium'>Copiar</p>
            </button>
          )}
        </div>
        <ul className='mt-4 flex flex-col gap-3 min-w-0'>
          {transfers.map((transfer, index) => (
            <li key={index} className='flex items-center min-w-0 flex-wrap'>
              <div className='flex items-center min-w-0 gap-1 mr-1'>
                <p className='mr-1'>{getEmojiFromString(transfer.debtor)}</p>
                <p className='text-ellipsis whitespace-nowrap overflow-hidden min-w-0'>{transfer.debtor}</p>
                <p className='whitespace-nowrap'>debe</p>
                <strong className='font-semibold whitespace-nowrap'>${formatAmount(transfer.amount)}</strong>
              </div>
              <div className='flex items-center min-w-0 gap-1'>
                <p className='whitespace-nowrap'>a</p>
                <p className='text-ellipsis whitespace-nowrap overflow-hidden min-w-0'>{transfer.creditor}</p>
                <p className='mr-1'>{getEmojiFromString(transfer.creditor)}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default Transfers
