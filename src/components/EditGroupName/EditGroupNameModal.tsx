import React, { useState } from 'react'

import { useTranslations } from 'next-intl'

import DrawerModal from '../DrawerModal'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface Props {
  initialGroupName: string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const EditGroupNameModal = ({ initialGroupName, open, setOpen }: Props) => {
  const [groupName, setGroupName] = useState(initialGroupName)

  const handleGroupName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const maxLength = e.target.maxLength

    if (value.length <= maxLength) {
      setGroupName(e.target.value)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const t = useTranslations('EditGroupNameModal')

  return (
    <DrawerModal open={open} setOpen={setOpen} title={t('Edit Group Name')}>
      <form className='flex flex-col gap-4 px-4' onSubmit={handleSubmit}>
        <div className='min-h-0 min-w-40 flex-1 space-y-1'>
          <Label htmlFor='date' className='text-xs'>
            <strong>Name</strong>
          </Label>
          <Input
            className='min-w-36 flex-[2.5] placeholder:text-gray-300'
            name='name'
            maxLength={50}
            onChange={handleGroupName}
            value={groupName}
            placeholder={initialGroupName}
          />
        </div>

        <Button className='mb-3' type='submit' disabled={groupName.trim() === ''}>
          {t('Edit')}
        </Button>
      </form>
    </DrawerModal>
  )
}

export default EditGroupNameModal
