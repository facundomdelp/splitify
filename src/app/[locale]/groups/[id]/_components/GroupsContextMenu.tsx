import { useState } from 'react'

import { useLocale, useTranslations } from 'next-intl'

import ConfirmationModal from '@/components/ConfirmationModal'
import ContextMenu from '@/components/ContextMenu'
import { ContextMenuItem } from '@/components/ContextMenu/ContextMenu'
import CopyToClipboard from '@/components/CopyToClipboard'
import EditGroupNameModal from '@/components/EditGroupName/EditGroupNameModal'
import Modal from '@/components/Modal'

import { PencilIcon, Share2, Trash2 } from 'lucide-react'

import { useRemoveGroup, useUpdateGroupName } from './hooks'

interface Props {
  groupId: string
}

const GroupsContextMenu = ({ groupId }: Props) => {
  const [openShareModal, setOpenShareModal] = useState(false)
  const [openEditGroupNameModal, setOpenEditGroupNameModal] = useState(false)
  const [openRemoveConfirmationModal, setOpenRemoveConfirmationModal] = useState(false)

  const { handleRemoveGroup } = useRemoveGroup({ groupId })
  const { handleEditGroupName, groupName } = useUpdateGroupName({ groupId })

  const locale = useLocale()
  const t = useTranslations('GroupsContextMenu')

  return (
    <>
      {openShareModal && (
        <Modal open={openShareModal} setOpen={setOpenShareModal} title={t('Share Group')} closeOnBackdropClick>
          <div className='space-y-3 text-center'>
            <p className='text-sm'>{t('🤑 Copy this link and share it with your friends! 💸')} </p>
            <code
              title='Copy this link'
              className='flex items-center justify-center break-all bg-gray-50 p-2 text-[9px]'
            >{`https://splitify.me/${locale}/groups/${groupId}`}</code>
            <p className='pb-3 text-[10px]'>{t('Your friends would be able to easily add expenses to this group')} </p>
            <CopyToClipboard
              onClick={() => setOpenShareModal(false)}
              copyString={`https://splitify.me/${locale}/groups/${groupId}`}
            />
          </div>
        </Modal>
      )}

      {openEditGroupNameModal && (
        <EditGroupNameModal
          open={openEditGroupNameModal}
          setOpen={setOpenEditGroupNameModal}
          onSubmit={handleEditGroupName}
          initialGroupName={groupName || ''}
        />
      )}

      {openRemoveConfirmationModal && (
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
      )}

      <ContextMenu>
        <ContextMenuItem key='share-group' onClick={() => setOpenShareModal(true)}>
          <Share2 /> {t('Share Group')}
        </ContextMenuItem>
        <ContextMenuItem key='edit-name' onClick={() => setOpenEditGroupNameModal(true)}>
          <PencilIcon /> {t('Edit Name')}
        </ContextMenuItem>
        <ContextMenuItem key='remove-group' onClick={() => setOpenRemoveConfirmationModal(true)}>
          <Trash2 /> {t('Remove Group')}
        </ContextMenuItem>
      </ContextMenu>
    </>
  )
}

export default GroupsContextMenu
