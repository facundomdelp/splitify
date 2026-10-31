'use client'

import { useEffect, useRef, useState } from 'react'

const readState = () => {
  const nav = window.navigator as Navigator & { standalone?: boolean }

  return {
    captured: window.__pwaInstallPrompt ? 'YES' : 'no',
    standalone: window.matchMedia('(display-mode: standalone)').matches ? 'YES' : 'no',
    eventSupported: 'onbeforeinstallprompt' in window ? 'YES' : 'no',
    iosStandalone: nav.standalone === true ? 'YES' : 'no',
  }
}

const readProbe = (probe: HTMLElement | null): Record<string, string> => {
  if (!probe) return {}

  const size = getComputedStyle(probe).fontSize

  return { probe14px: size, boosted: size === '14px' ? 'no' : 'YES' }
}

const readCallout = (panel: HTMLElement | null): Record<string, string> => {
  const node = panel?.nextElementSibling

  if (!(node instanceof HTMLElement)) return { callout: 'NOT FOUND' }

  const strong = node.querySelector('strong')
  const styles = getComputedStyle(node)
  const titleStyles = strong ? getComputedStyle(strong) : null

  return {
    callout: node.tagName.toLowerCase(),
    svgs: String(node.querySelectorAll('svg').length),
    lines: String(node.innerText.split('\n').length),
    text: node.innerText.replace(/\n/g, ' / '),
    align: styles.textAlign,
    radius: styles.borderRadius,
    titleSize: titleStyles ? titleStyles.fontSize : 'n/a',
    titleDecoration: titleStyles ? titleStyles.textDecorationLine : 'n/a',
  }
}

const PWADebug = () => {
  const panelRef = useRef<HTMLDListElement>(null)
  const probeRef = useRef<HTMLSpanElement>(null)
  const [state, setState] = useState<Record<string, string> | null>(null)

  useEffect(() => {
    const update = () => setState({ ...readState(), ...readProbe(probeRef.current), ...readCallout(panelRef.current) })

    const timer = window.setTimeout(update, 400)

    window.addEventListener('pwainstallchange', update)
    window.addEventListener('beforeinstallprompt', update)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('pwainstallchange', update)
      window.removeEventListener('beforeinstallprompt', update)
    }
  }, [])

  return (
    <>
      <span ref={probeRef} className='pointer-events-none absolute text-sm opacity-0'>
        probe
      </span>
      <dl
        ref={panelRef}
        className='border-brand-border bg-brand-surface text-brand-text grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 rounded-xl border p-3 text-[10px] break-all'
      >
        {Object.entries(state ?? { status: 'reading...' }).map(([key, value]) => (
          <div key={key} className='contents'>
            <dt className='font-semibold'>{key}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </>
  )
}

export default PWADebug
