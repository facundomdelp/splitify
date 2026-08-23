'use client'

import { useTranslations } from 'next-intl'

import Modal from '@/components/Modal'

import { THEMES, useSetTheme } from '@/utils/hooks/useTheme'

import { Check, Monitor, Moon, Sun } from 'lucide-react'

const ICONS = { system: Monitor, light: Sun, dark: Moon } as const

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ThemeModal = ({ open, setOpen }: Props) => {
  const { theme, setTheme } = useSetTheme()

  const t = useTranslations('ThemeModal')

  return (
    <Modal open={open} setOpen={setOpen} title={t('Appearance')} closeOnBackdropClick>
      <div className='flex flex-col'>
        {THEMES.map((option) => {
          const Icon = ICONS[option]

          return (
            <button
              key={option}
              onClick={() => {
                setTheme(option)
                setOpen(false)
              }}
              className='hover:bg-accent flex items-center gap-3 rounded-md px-3 py-2.5 text-start'
            >
              <Icon className='text-brand size-4 shrink-0' />
              <span className='flex-1 text-sm'>{t(option)}</span>
              {theme === option && <Check className='text-primary size-4' />}
            </button>
          )
        })}
      </div>
    </Modal>
  )
}

export default ThemeModal
