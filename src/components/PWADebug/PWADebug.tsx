'use client'

import { useEffect, useState } from 'react'

const readState = () => {
  const nav = window.navigator as Navigator & { standalone?: boolean }

  return {
    captured: window.__pwaInstallPrompt ? 'YES' : 'no',
    installedFlag: window.__pwaInstalled ? 'YES' : 'no',
    standalone: window.matchMedia('(display-mode: standalone)').matches ? 'YES' : 'no',
    iosStandalone: nav.standalone === true ? 'YES' : 'no',
    eventSupported: 'onbeforeinstallprompt' in window ? 'YES' : 'no',
    secureContext: window.isSecureContext ? 'YES' : 'no',
    headScript: Array.from(document.scripts).some((s) => (s.textContent || '').includes('__pwaInstallPrompt'))
      ? 'YES'
      : 'no',
    viewport: `${window.innerWidth}x${window.innerHeight} @${window.devicePixelRatio}`,
    ua: window.navigator.userAgent,
  }
}

const PWADebug = () => {
  const [state, setState] = useState<Record<string, string> | null>(null)

  useEffect(() => {
    const update = () => setState(readState())

    update()
    window.addEventListener('pwainstallchange', update)
    window.addEventListener('beforeinstallprompt', update)
    window.addEventListener('appinstalled', update)

    return () => {
      window.removeEventListener('pwainstallchange', update)
      window.removeEventListener('beforeinstallprompt', update)
      window.removeEventListener('appinstalled', update)
    }
  }, [])

  if (!state) return null

  return (
    <dl className='border-brand-border bg-brand-surface text-brand-text grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 rounded-xl border p-3 text-[10px] break-all'>
      {Object.entries(state).map(([key, value]) => (
        <div key={key} className='contents'>
          <dt className='font-semibold'>{key}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  )
}

export default PWADebug
