import React from 'react'
import { Button } from '../ui/button'
import { useTranslations } from 'next-intl'
import { usePWAInstall } from './usePWAInstall'

const InstallApp = () => {
  const { isInstallable, handleInstallClick } = usePWAInstall()

  const t = useTranslations('InstallApp')

  return (
    isInstallable && (
      <Button
        onClick={handleInstallClick}
        variant='default'
        className='rounded-2xl drop-shadow-xl bg-green-500 relative overflow-hidden animate-beat delay-[5000ms]'
      >
        {t('Install App')}
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white opacity-10 animate-shine' />
      </Button>
    )
  )
}

export default InstallApp
