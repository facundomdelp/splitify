import { useTranslations } from 'next-intl'

import ContextMenu from '@/components/ContextMenu'
import { ContextMenuItem } from '@/components/ContextMenu/ContextMenu'

import { Wand } from 'lucide-react'

interface Props {
  disabled?: boolean
  onTurnIntoGroup: () => void
}

const HomeContextMenu = ({ disabled, onTurnIntoGroup }: Props) => {
  const t = useTranslations('HomeContextMenu')

  return (
    <ContextMenu>
      <ContextMenuItem onClick={onTurnIntoGroup} disabled={disabled}>
        <Wand /> {t('Turn into a Group ✈️')}
      </ContextMenuItem>
    </ContextMenu>
  )
}

export default HomeContextMenu
