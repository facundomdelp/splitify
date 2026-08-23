'use client'

import { useState } from 'react'

import { useLocale, useTranslations } from 'next-intl'

import ConfirmationModal from '@/components/ConfirmationModal'
import CurrencySelector from '@/components/CurrencySelector'
import Modal from '@/components/Modal'

import { getCurrencyName } from '@/utils/constants/availableCurrencies'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  currency?: string
  onSelect: (currency: string) => void
  confirmChange?: boolean
}

const CurrencyModal = ({ open, setOpen, currency, onSelect, confirmChange }: Props) => {
  const [pending, setPending] = useState<string>()

  const locale = useLocale()
  const t = useTranslations('CurrencyModal')

  const handleSelect = (next: string) => {
    if (confirmChange && currency && next !== currency) {
      setPending(next)
      return
    }

    onSelect(next)
    setOpen(false)
  }

  return (
    <>
      <Modal open={open} setOpen={setOpen} title={t('Currency')} closeOnBackdropClick>
        <div className='space-y-2'>
          <CurrencySelector currency={currency} onSelect={handleSelect} />
          <p className='text-[10px]'>{t('Only changes how amounts are shown, nothing is converted')}</p>
        </div>
      </Modal>

      {pending && (
        <ConfirmationModal
          open={!!pending}
          onOpenChange={(value) => !value && setPending(undefined)}
          title={t('Change the currency to {currency}?', { currency: getCurrencyName(pending, locale) })}
          description={t('Amounts stay the same and this changes it for everyone in the group')}
          onConfirm={() => {
            onSelect(pending)
            setPending(undefined)
            setOpen(false)
          }}
          destructive
        />
      )}
    </>
  )
}

export default CurrencyModal
