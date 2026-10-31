'use client'

import { useTranslations } from 'next-intl'

import Modal from '@/components/Modal'

import { Check, Share, SquarePlus } from 'lucide-react'

const STEPS = [
  { key: 'Tap the Share button', icon: Share },
  { key: 'Scroll down and choose "Add to Home Screen"', icon: SquarePlus },
  { key: 'Tap "Add" to finish', icon: Check },
] as const

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const InstallInstructionsModal = ({ open, setOpen }: Props) => {
  const t = useTranslations('InstallInstructionsModal')

  return (
    <Modal open={open} setOpen={setOpen} title={t('Install Splitify')} closeOnBackdropClick>
      <ol className='flex flex-col gap-4 px-4 py-2'>
        {STEPS.map(({ key, icon: Icon }, index) => (
          <li key={key} className='flex items-center gap-3'>
            <span className='bg-brand-surface text-brand flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold'>
              {index + 1}
            </span>
            <Icon className='text-brand size-5 shrink-0' />
            <span className='flex-1 text-sm'>{t(key)}</span>
          </li>
        ))}
      </ol>
    </Modal>
  )
}

export default InstallInstructionsModal
