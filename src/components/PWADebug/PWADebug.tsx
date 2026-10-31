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

const rect = (el: Element | null) => {
  if (!el) return 'missing'

  const r = el.getBoundingClientRect()

  return `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`
}

const readCallout = (panel: HTMLElement | null): Record<string, string> => {
  const node = panel?.nextElementSibling

  if (!(node instanceof HTMLElement)) return { callout: 'NOT FOUND' }

  const strong = node.querySelector('strong')
  const icon = node.querySelector('svg')
  const desc = strong?.nextElementSibling ?? null
  const styles = getComputedStyle(node)
  const titleStyles = strong ? getComputedStyle(strong) : null
  const box = node.getBoundingClientRect()
  const hit = document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2)

  return {
    svgs: String(node.querySelectorAll('svg').length),
    align: styles.textAlign,
    titleSize: titleStyles ? titleStyles.fontSize : 'n/a',
    btnBox: rect(node),
    iconBox: rect(icon),
    titleBox: rect(strong),
    descBox: rect(desc),
    iconOpacity: icon ? getComputedStyle(icon).opacity + '/' + getComputedStyle(icon).color : 'n/a',
    hitTest: hit ? hit.tagName.toLowerCase() + '.' + String(hit.className).slice(0, 40) : 'none',
    zoom: String(Math.round((window.outerWidth / window.innerWidth) * 100) / 100),
  }
}

const PWADebug = () => {
  const panelRef = useRef<HTMLDListElement>(null)
  const probeRef = useRef<HTMLSpanElement>(null)
  const [state, setState] = useState<Record<string, string> | null>(null)

  useEffect(() => {
    const update = () => setState({ ...readState(), ...readProbe(probeRef.current), ...readCallout(panelRef.current) })

    const timer = window.setInterval(update, 1000)

    window.addEventListener('pwainstallchange', update)
    window.addEventListener('beforeinstallprompt', update)

    return () => {
      window.clearInterval(timer)
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
