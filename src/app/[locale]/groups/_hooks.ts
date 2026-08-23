import { useCallback, useState } from 'react'

import { useParams, useRouter } from 'next/navigation'

import { Locale } from '@/types/common-types'

import { useGetCurrency } from '@/utils/hooks/useCurrency'

export const useAddNewGroup = () => {
  const [newGroupState, setNewGroupState] = useState({ loading: false, error: false })

  const router = useRouter()
  const { locale } = useParams<{ locale: Locale }>()
  const currency = useGetCurrency()

  const addNewGroup = useCallback(async () => {
    setNewGroupState({ error: false, loading: true })

    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currency }),
      })

      const data = await response.json()
      router.push(`/${locale}/groups/${data.group}`)
    } catch {
      setNewGroupState((prev) => ({ ...prev, error: true }))
    } finally {
      setTimeout(() => {
        setNewGroupState((prev) => ({ ...prev, loading: false }))
      }, 500)
    }
  }, [currency, locale, router])

  return { newGroupState, addNewGroup }
}

export const useNavigateToGroup = () => {
  const { locale } = useParams<{ locale: Locale }>()
  const router = useRouter()

  const navigateToGroup = (id: string) => {
    router.push(`/${locale}/groups/${id}`)
  }

  return { navigateToGroup }
}
