'use client'

import { useEffect } from 'react'

import { useGetMetadata, useSetMetadata } from '@/store/metadata-store'

export const THEMES = ['system', 'light', 'dark'] as const

export type Theme = (typeof THEMES)[number]

export const resolveTheme = (theme: Theme): 'light' | 'dark' => {
  if (theme !== 'system') return theme

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const applyTheme = (theme: Theme) => {
  document.documentElement.classList.toggle('dark', resolveTheme(theme) === 'dark')
}

export const useGetTheme = (): Theme => {
  return useGetMetadata()?.theme ?? 'system'
}

export const useSetTheme = () => {
  const [metadata, setMetadata] = useSetMetadata()

  const theme = metadata.theme ?? 'system'

  useEffect(() => {
    applyTheme(theme)

    if (theme !== 'system') return

    const query = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => applyTheme('system')

    query.addEventListener('change', onChange)

    return () => query.removeEventListener('change', onChange)
  }, [theme])

  const setTheme = (next: Theme) => {
    applyTheme(next)
    setMetadata((prev) => ({ ...prev, theme: next }))
  }

  return { theme, setTheme }
}
