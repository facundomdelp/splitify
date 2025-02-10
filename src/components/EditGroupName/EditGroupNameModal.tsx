import { useState } from 'react'

import { useTranslations } from 'next-intl'

import DrawerModal from '@/components/DrawerModal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Props {
  initialGroupName: string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: ({ groupName }: { groupName: string }) => void
}

const EditGroupNameModal = ({ initialGroupName, open, setOpen, onSubmit }: Props) => {
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

    onSubmit({ groupName })

    setGroupName('')
    setOpen(false)
  }

  const t = useTranslations('EditGroupNameModal')

  return (
    <DrawerModal open={open} setOpen={setOpen} title={t('Edit Group Name')} className='px-4'>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='min-h-0 min-w-40 flex-1 space-y-1'>
          <Label htmlFor='date' className='text-xs'>
            <strong>{t('Name')}</strong>
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
