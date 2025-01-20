import ContextMenu from '@/components/ContextMenu'
import { ContextMenuItem } from '@/components/ContextMenu/ContextMenu'
import CopyToClipboard from '@/components/CopyToClipboard'
import Modal from '@/components/Modal'
import { Share2 } from 'lucide-react'
import { useLocale } from 'next-intl'
import React, { useState } from 'react'

interface Props {
  groupId?: string
}

const GroupsContextMenu = ({ groupId }: Props) => {
  const [openShareModal, setOpenShareModal] = useState(false)

  const locale = useLocale()

  return (
    <>
      {groupId && (
        <Modal open={openShareModal} setOpen={setOpenShareModal} title={'Share Group'} closeOnBackdropClick>
          <div className='space-y-3 text-center'>
            <p className='text-sm'>{'🤑 Copy this link and share it with your friends!  💸'} </p>
            <code
              title='Copy this link'
              className='text-[10px] text-wrap p-2 bg-gray-50 flex items-center justify-center'
            >{`https://splitify.me/${locale}/groups/${groupId}`}</code>
            <p className='text-[10px] pb-3'>{'Your friends can easily add expenses to this group.'} </p>
            <CopyToClipboard
              onClick={() => setOpenShareModal(false)}
              copyString={`https://splitify.me/${locale}/groups/${groupId}`}
            />
          </div>
        </Modal>
      )}

      <ContextMenu>
        <ContextMenuItem onClick={() => setOpenShareModal(true)}>
          <Share2 /> Share Group
        </ContextMenuItem>
      </ContextMenu>
    </>
  )
}

export default GroupsContextMenu
