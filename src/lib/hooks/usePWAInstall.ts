import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent
  }
}

export const usePWAInstall = () => {
  const [isInstallable, setIsInstallable] = useState(false)
  const [installPromptEvent, setInstallPromptEvent] = useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    const beforeInstallPromptListener = (event: BeforeInstallPromptEvent) => {
      event.preventDefault()
      setIsInstallable(true)
      setInstallPromptEvent(event)
    }

    window.addEventListener('beforeinstallprompt', beforeInstallPromptListener)

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallPromptListener)
    }
  }, [])

  const handleInstallClick = () => {
    if (installPromptEvent) {
      installPromptEvent.prompt()
      installPromptEvent.userChoice.then((/* choiceResult */) => {
        // if (choiceResult.outcome === 'accepted') {
        //   console.log('User accepted the PWA installation')
        // } else {
        //   console.log('User dismissed the PWA installation')
        // }
        setIsInstallable(false)
      })
    }
  }

  return { isInstallable, handleInstallClick }
}
