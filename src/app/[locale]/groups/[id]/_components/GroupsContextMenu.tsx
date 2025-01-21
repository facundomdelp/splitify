import ConfirmationModal from '@/components/ConfirmationModal'
import ContextMenu from '@/components/ContextMenu'
import { ContextMenuItem } from '@/components/ContextMenu/ContextMenu'
import CopyToClipboard from '@/components/CopyToClipboard'
import Modal from '@/components/Modal'
import { Share2, Trash2 } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { useRemoveGroup } from './hooks'

interface Props {
  groupId?: string
}

const GroupsContextMenu = ({ groupId }: Props) => {
  const [openShareModal, setOpenShareModal] = useState(false)
  const [openRemoveConfirmationModal, setOpenRemoveConfirmationModal] = useState(false)

  const { handleRemoveGroup } = useRemoveGroup({ groupId })

  const locale = useLocale()
  const t = useTranslations('GroupsContextMenu')

  return (
    <>
      {groupId && (
        <Modal open={openShareModal} setOpen={setOpenShareModal} title={t('Share Group')} closeOnBackdropClick>
          <div className='space-y-3 text-center'>
            <p className='text-sm'>{t('🤑 Copy this link and share it with your friends! 💸')} </p>
            <code
              title='Copy this link'
              className='text-[10px] text-wrap p-2 bg-gray-50 flex items-center justify-center'
            >{`https://splitify.me/${locale}/groups/${groupId}`}</code>
            <p className='text-[10px] pb-3'>{t('Your friends would be able to easily add expenses to this group')} </p>
            <CopyToClipboard
              onClick={() => setOpenShareModal(false)}
              copyString={`https://splitify.me/${locale}/groups/${groupId}`}
            />
          </div>
        </Modal>
      )}

      <ConfirmationModal
        open={openRemoveConfirmationModal}
        onOpenChange={setOpenRemoveConfirmationModal}
        title={<>{t('Are you sure you want to remove this group?')}</>}
        description={t(
          "Removing this group won't delete it, you will simply stop seeing it You can use the link again to access it whenever you want",
        )}
        onConfirm={handleRemoveGroup}
        destructive
      />

      <ContextMenu>
        <ContextMenuItem key='share-group' onClick={() => setOpenShareModal(true)}>
          <Share2 /> {t('Share Group')}
        </ContextMenuItem>
        <ContextMenuItem key='-group' onClick={() => setOpenRemoveConfirmationModal(true)}>
          <Trash2 /> {t('Remove Group')}
        </ContextMenuItem>
      </ContextMenu>
    </>
  )
}

export default GroupsContextMenu
