'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Spinner from '@/components/ui/spinner'
import { copyToClipboard } from '@/lib/functions/copyToClipboard'
import { Locale } from '@/types/common.types'
import { Clipboard, HandCoinsIcon, Lightbulb, PlusCircleIcon, Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

const GroupsPage = () => {
  const [newGroupState, setNewGroupState] = useState({ loading: false, error: false })

  const router = useRouter()
  const { id, locale } = useParams<{ id: string; locale: Locale }>()

  const addNewGroup = useCallback(async () => {
    setNewGroupState({ error: true, loading: true })

    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await response.json()
      router.push(`/${locale}/groups/${data.group}`)
    } catch {
      setNewGroupState((prev) => ({ ...prev, error: true }))
    } finally {
      setNewGroupState((prev) => ({ ...prev, loading: false }))
    }
  }, [locale, router])

  return (
    <main className='w-full p-6 text-dark max-w-[600px] space-y-10'>
      <section className='flex flex-col gap-4'>
        <Card key='add-new-group' className='flex cursor-pointer hover:shadow-lg' onClick={addNewGroup}>
          <CardHeader className='flex-1 space-y-0'>
            <CardTitle className='text-lg flex flex-row items-center gap-3 text-green-800'>
              <PlusCircleIcon className='text-green-500 flex-shrink-0' /> Add New Group
            </CardTitle>
          </CardHeader>
          <CardContent className='p-6 flex items-center'>
            {!newGroupState.loading ? <p>🤑</p> : <Spinner className='text-green-600' />}
          </CardContent>
        </Card>

        <Card key='add-existent-group' className='flex cursor-pointer hover:shadow-lg'>
          <CardHeader className='flex-1 space-y-0'>
            <CardTitle className='text-lg flex flex-row items-center gap-3 text-green-800'>
              <Lightbulb className='text-green-500 flex-shrink-0' /> Already have a group?
            </CardTitle>
          </CardHeader>
          <CardContent className='p-6 flex items-center'>
            <Input className='h-[28px] placeholder:text-xs' placeholder='Input your group ID' />
          </CardContent>
        </Card>
      </section>

      <section className='flex flex-col gap-4'>
        <h2 className='text-lg font-bold flex flex-nowrap gap-2 items-center' id='expenses'>
          <HandCoinsIcon className='size-[22px] text-green-700' />
          My Groups
        </h2>
        <Card key='card-1' className='flex cursor-pointer hover:shadow-lg'>
          <CardHeader className='flex-1 space-y-2'>
            <CardTitle className='text-lg text-green-800'>💘 Card Title</CardTitle>
            <CardDescription className='flex items-center gap-2 text-sm'>
              <Clipboard
                className='size-[16px] cursor-pointer flex-shrink-0'
                onClick={() => copyToClipboard(`https://splitify.me/${id}/groups/21a56257-894c-4578-a4f8-1457daefb22e`)}
              />
              21a56257-894c-4578-a4f8-1457daefb22e
            </CardDescription>
          </CardHeader>
          <CardContent className='p-6 flex items-center'>
            <Trash className='size-[18px] text-gray-500 cursor-pointer' />
          </CardContent>
        </Card>
      </section>
    </main>
  )
}

export default GroupsPage
