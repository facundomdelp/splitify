'use client'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Spinner from '@/components/ui/spinner'

import { useSetGroups } from '@/store/groups.store'

import { useGetEmojiFromString } from '@/utils/hooks/useGetEmojiFromString'

import { HandCoinsIcon, PlusCircleIcon } from 'lucide-react'

import { useAddNewGroup, useNavigateToGroup } from './_hooks'

const GroupsPage = () => {
  const { groups } = useSetGroups()

  const { newGroupState, addNewGroup } = useAddNewGroup()
  const { navigateToGroup } = useNavigateToGroup()

  const getEmojiFromString = useGetEmojiFromString(true)

  return (
    <main className='text-dark w-full max-w-[600px] space-y-8 p-8'>
      <section className='flex flex-col gap-4'>
        <div className='flex items-center'>
          <h2 className='flex flex-nowrap items-center gap-2 text-lg font-bold' id='expenses'>
            <HandCoinsIcon className='size-[22px] text-green-700' />
            My Groups
          </h2>
        </div>

        <Card
          key='add-new-group'
          className={cn(
            'flex cursor-pointer hover:shadow-lg',
            newGroupState.loading ? 'pointer-events-none opacity-40' : '',
          )}
          onClick={addNewGroup}
        >
          <CardHeader className='flex-1 space-y-0'>
            <CardTitle className='flex flex-row items-center gap-3 text-lg text-green-800'>
              <PlusCircleIcon className='flex-shrink-0 text-green-500' /> Add New Group
            </CardTitle>
          </CardHeader>
          <CardContent className='flex items-center p-6'>
            {!newGroupState.loading ? <p>🤑</p> : <Spinner className='text-green-600' />}
          </CardContent>
        </Card>

        {groups.map((group) => (
          <Card key={group.id} className={cn('flex', newGroupState.loading ? 'pointer-events-none opacity-40' : '')}>
            <CardHeader className='min-w-0 flex-1 justify-center space-y-0 pr-0'>
              <CardTitle className='flex min-w-0 items-center gap-2 font-medium text-green-800'>
                <p>{getEmojiFromString(group.id)}</p>
                <p className='min-w-0 overflow-hidden text-ellipsis text-nowrap'>{group.name}</p>
              </CardTitle>
            </CardHeader>
            <CardContent className='flex items-center p-6'>
              <Button
                className='h-6 rounded-2xl px-5 text-[12px] shadow-none'
                onClick={() => navigateToGroup(group.id)}
              >
                Ver
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  )
}

export default GroupsPage
