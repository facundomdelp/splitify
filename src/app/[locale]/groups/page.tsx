'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Spinner from '@/components/ui/spinner'
import { ChevronRight, HandCoinsIcon, PlusCircleIcon } from 'lucide-react'
import { useAddNewGroup, useNavigateToGroup } from './hooks'
import { useGetEmojiFromString } from '@/lib/hooks/useGetEmojiFromString'
import { useSetGroups } from '@/store/groups.store'
import { cn } from '@/lib/utils'

const GroupsPage = () => {
  const { groups } = useSetGroups()

  const { newGroupState, addNewGroup } = useAddNewGroup()
  const { navigateToGroup } = useNavigateToGroup()

  const getEmojiFromString = useGetEmojiFromString(true)

  return (
    <main className='w-full p-6 text-dark max-w-[600px] space-y-8'>
      <section className='flex flex-col gap-4'>
        <div className='flex items-center'>
          <h2 className='text-lg font-bold flex flex-nowrap gap-2 items-center' id='expenses'>
            <HandCoinsIcon className='size-[22px] text-green-700' />
            My Groups
          </h2>
        </div>

        <Card
          key='add-new-group'
          className={cn(
            'flex cursor-pointer hover:shadow-lg',
            newGroupState.loading ? 'opacity-40 pointer-events-none' : '',
          )}
          onClick={addNewGroup}
        >
          <CardHeader className='flex-1 space-y-0'>
            <CardTitle className='text-lg flex flex-row items-center gap-3 text-green-800'>
              <PlusCircleIcon className='text-green-500 flex-shrink-0' /> Add New Group
            </CardTitle>
          </CardHeader>
          <CardContent className='p-6 flex items-center'>
            {!newGroupState.loading ? <p>🤑</p> : <Spinner className='text-green-600' />}
          </CardContent>
        </Card>

        {groups.map((group) => (
          <Card
            key={group.id}
            className={cn(
              'flex cursor-pointer hover:shadow-lg',
              newGroupState.loading ? 'opacity-40 pointer-events-none' : '',
            )}
            onClick={() => navigateToGroup(group.id)}
          >
            <CardHeader className='flex-1 space-y-0 min-w-0 pr-0 justify-center'>
              <CardTitle className='text-green-800 flex items-center gap-2 min-w-0 font-medium'>
                <p>{getEmojiFromString(group.id)}</p>
                <p className='text-ellipsis text-nowrap overflow-hidden min-w-0'>{group.name}</p>
              </CardTitle>
            </CardHeader>
            <CardContent className='p-6 flex items-center'>
              <ChevronRight className='size-5 opacity-50' />
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  )
}

export default GroupsPage
