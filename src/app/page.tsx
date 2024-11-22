'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Participants } from './_components/Participants'
import Transfers from './_components/Transfers'
import { Plus } from 'lucide-react'
import { useCalculateTransfers, useHandleParticipantsForm } from './hooks'

export default function Home() {
  const { participants, setParticipants, name, amount, handleAmount, handleName, handleSubmit } =
    useHandleParticipantsForm()
  const { transfers, setTransfers, handleCalculateTransfers } = useCalculateTransfers({ participants, setParticipants })

  return (
    <main className='my-8 mx-4 flex flex-col gap-8 max-w-[600px] text-gray-600 flex-1'>
      <section className='flex flex-col gap-2'>
        <p className='text-sm'>Añadir participante</p>
        <form className='flex gap-4 flex-wrap' onSubmit={handleSubmit}>
          <Input
            className='min-w-40 flex-1'
            name='name'
            maxLength={50}
            onChange={handleName}
            value={transfers.length > 0 ? '-' : name}
            disabled={transfers.length > 0}
          />

          <div className='flex gap-4 ml-auto'>
            <div className='relative min-w-20 max-w-24 flex-1'>
              <span className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm leading-4'>$</span>
              <Input
                className='pl-6 text-sm'
                type='number'
                name='amount'
                max={1000000000}
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
        <Participants
          participants={participants}
          setParticipants={setParticipants}
          handleCalculateTransfers={handleCalculateTransfers}
        />
      ) : (
        <Transfers transfers={transfers} setTransfers={setTransfers} />
      )}
    </main>
  )
}
