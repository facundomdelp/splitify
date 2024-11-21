import { Button } from '@/components/ui/button'
import { formatAmount } from '@/lib/functions/formatAmount'
import { getEmojiFromString } from '@/lib/functions/getEmojiFromString'
import { CheckIcon, Clipboard } from 'lucide-react'
import { useCopyTransfersToClipboard } from '../hooks'
import { Transfer } from '@/types'

interface Props {
  transfers: Transfer[]
  setTransfers: React.Dispatch<React.SetStateAction<Transfer[]>>
}

const Transfers = ({ transfers, setTransfers }: Props) => {
  const { handleCopyToClipboard, copied } = useCopyTransfersToClipboard({ transfers })

  return (
    <>
      <section className='text-sm'>
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
        <ul className='mt-4 flex flex-col gap-3'>
          {transfers.map((transfer, index) => (
            <li key={index}>
              {`${getEmojiFromString(transfer.debtor)} ${transfer.debtor} debe `}
              <strong className='font-semibold'>${formatAmount(transfer.amount)}</strong>
              {` a ${transfer.creditor} ${getEmojiFromString(transfer.creditor)}`}
            </li>
          ))}
        </ul>
      </section>

      <section className='mt-auto flex'>
        <Button className='flex-1' onClick={() => setTransfers([])} variant='outline'>
          Limpiar
        </Button>
      </section>
    </>
  )
}

export default Transfers
