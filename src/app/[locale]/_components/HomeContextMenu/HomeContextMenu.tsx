import { useState } from 'react'

import { useTranslations } from 'next-intl'

import ContextMenu from '@/components/ContextMenu'
import { ContextMenuItem } from '@/components/ContextMenu/ContextMenu'
import CurrencyModal from '@/components/CurrencyModal'

import { useSetCurrency } from '@/utils/hooks/useCurrency'

import { Coins, Wand } from 'lucide-react'

interface Props {
  disabled?: boolean
  onTurnIntoGroup: () => void
}

const HomeContextMenu = ({ disabled, onTurnIntoGroup }: Props) => {
  const [openCurrencyModal, setOpenCurrencyModal] = useState(false)

  const { currency, setCurrency } = useSetCurrency()

  const t = useTranslations('HomeContextMenu')
  const tCurrency = useTranslations('CurrencyModal')

  return (
    <>
      {openCurrencyModal && (
        <CurrencyModal
          open={openCurrencyModal}
          setOpen={setOpenCurrencyModal}
          currency={currency}
          onSelect={setCurrency}
        />
      )}

      <ContextMenu>
        <ContextMenuItem onClick={onTurnIntoGroup} disabled={disabled}>
          <Wand /> {t('Turn into a Group ✈️')}
        </ContextMenuItem>
        <ContextMenuItem onClick={() => setOpenCurrencyModal(true)}>
          <Coins /> {tCurrency('Currency')}
          {currency && <span className='ml-auto pl-2 text-gray-400'>{currency}</span>}
        </ContextMenuItem>
      </ContextMenu>
    </>
  )
}

export default HomeContextMenu
