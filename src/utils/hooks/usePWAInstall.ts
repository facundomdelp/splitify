import { useCallback, useEffect, useSyncExternalStore } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent
    pwainstallchange: Event
  }

  interface Window {
    __pwaInstallPrompt?: BeforeInstallPromptEvent | null
    __pwaInstalled?: boolean
  }
}

const CHANGE_EVENT = 'pwainstallchange'

const emitChange = () => window.dispatchEvent(new Event(CHANGE_EVENT))

const getPrompt = () => (typeof window === 'undefined' ? null : (window.__pwaInstallPrompt ?? null))

const isRunningStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  (window.navigator as Navigator & { standalone?: boolean }).standalone === true

const isIOSDevice = () =>
  /iPad|iPhone|iPod/.test(window.navigator.userAgent) ||
  (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1)

const subscribe = (onStoreChange: () => void) => {
  window.addEventListener(CHANGE_EVENT, onStoreChange)
  window.addEventListener('appinstalled', onStoreChange)

  return () => {
    window.removeEventListener(CHANGE_EVENT, onStoreChange)
    window.removeEventListener('appinstalled', onStoreChange)
  }
}

type InstallMode = 'none' | 'prompt' | 'instructions'

const getSnapshot = (): InstallMode => {
  if (typeof window === 'undefined') return 'none'
  if (window.__pwaInstalled || isRunningStandalone()) return 'none'
  if (getPrompt()) return 'prompt'
  if (isIOSDevice()) return 'instructions'

  return 'none'
}

const getServerSnapshot = (): InstallMode => 'none'

export const usePWAInstall = () => {
  const installMode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  useEffect(() => {
    const captureListener = (event: BeforeInstallPromptEvent) => {
      event.preventDefault()
      window.__pwaInstallPrompt = event
      emitChange()
    }

    const installedListener = () => {
      window.__pwaInstallPrompt = null
      window.__pwaInstalled = true
      emitChange()
    }

    window.addEventListener('beforeinstallprompt', captureListener)
    window.addEventListener('appinstalled', installedListener)

    return () => {
      window.removeEventListener('beforeinstallprompt', captureListener)
      window.removeEventListener('appinstalled', installedListener)
    }
  }, [])

  const handleInstallClick = useCallback(() => {
    const event = getPrompt()
    if (!event) return

    window.__pwaInstallPrompt = null
    Promise.resolve(event.prompt()).catch(() => undefined)
    emitChange()
  }, [])

  return {
    isInstallable: installMode !== 'none',
    needsInstructions: installMode === 'instructions',
    handleInstallClick,
  }
}
