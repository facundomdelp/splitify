import { useTranslations } from 'next-intl'

import LocaleSelector from '@/components/LocaleSelector'
import Modal from '@/components/Modal'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const LocaleSelectorModal = ({ open, setOpen }: Props) => {
  const t = useTranslations('LocaleSelectorModal')

  return (
    <Modal open={open} setOpen={setOpen} title={t('Language')} closeOnBackdropClick>
      <div className='space-y-2'>
        <LocaleSelector />
        <p className='text-[10px]'>
          {t('Would you like to select a different language?')}{' '}
          <a href='splitify.me@gmail.com' className='text-blue-700 hover:underline'>
            {t('Send us an email!')}
          </a>
        </p>
      </div>
    </Modal>
  )
}

export default LocaleSelectorModal
