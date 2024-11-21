'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatAmount } from '@/lib/functions/formatAmount'
import { CheckIcon, Clipboard, Plus } from 'lucide-react'
import { useCalculateTransfers, useCopyTransfersToClipboard, useHandleParticipantsForm } from './hooks'
import { getEmojiFromString } from '@/lib/functions/getEmojiFromString'

export default function Home() {
  const { participants, setParticipants, name, amount, handleAmount, handleName, handleSubmit } =
    useHandleParticipantsForm()

  const { transfers, setTransfers, handleCalculateTransfers } = useCalculateTransfers({ participants, setParticipants })

  const { handleCopyToClipboard, copied } = useCopyTransfersToClipboard({ transfers })

  return (
    <main className='my-8 mx-4 flex flex-col gap-8 w-full'>
      <section className='flex flex-col gap-2'>
        <p className='text-sm'>Añadir participante</p>
        <form className='flex gap-4 flex-wrap' onSubmit={handleSubmit}>
          <Input
            className='min-w-40 flex-1'
            name='name'
            maxLength={30}
            onChange={handleName}
            value={name}
            disabled={transfers.length > 0}
          />

          <div className='flex gap-4 ml-auto'>
            <div className='relative min-w-20 max-w-24 flex-1'>
              <span className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm leading-4'>$</span>
              <Input
                className='pl-6 text-sm'
                type='number'
                name='amount'
                max={10000000}
                min={0}
                step={0.01}
                onChange={handleAmount}
                value={amount}
                disabled={transfers.length > 0}
              />
            </div>
            <Button
              size='icon'
              className='min-w-10 ml-auto'
              type='submit'
              disabled={name === '' || transfers.length > 0}
            >
              <Plus />
            </Button>
          </div>
        </form>
      </section>

      {!transfers.length ? (
        <>
          <section className='text-sm h-full flex flex-col'>
            <h2 className='text-lg font-bold'>Participantes</h2>
            {Object.keys(participants).length ? (
              <ul className='mt-4 flex flex-col gap-3'>
                {Object.entries(participants)
                  .toReversed()
                  .map(([name, amount], index) => (
                    <li key={index}>
                      {getEmojiFromString(name)} {name}: ${amount.toFixed(2)}
                    </li>
                  ))}
              </ul>
            ) : (
              <p className='m-auto text-gray-500'>¡Ingresa un Participante para comenzar!</p>
            )}
          </section>

          <section className='mt-auto flex'>
            <Button
              className='flex-1'
              onClick={handleCalculateTransfers}
              disabled={Object.values(participants).length < 2}
            >
              Calcular Saldos
            </Button>
          </section>
        </>
      ) : (
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
      )}
    </main>
  )
}
