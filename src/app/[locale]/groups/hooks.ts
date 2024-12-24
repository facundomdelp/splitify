import { Locale } from '@/types/common.types'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

export const useAddNewGroup = () => {
  const [newGroupState, setNewGroupState] = useState({ loading: false, error: false })

  const router = useRouter()
  const { locale } = useParams<{ locale: Locale }>()

  const addNewGroup = useCallback(async () => {
    setNewGroupState({ error: false, loading: true })

    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await response.json()
      router.push(`/${locale}/groups/${data.group}`)
    } catch {
      setNewGroupState((prev) => ({ ...prev, error: true }))
    } finally {
      setNewGroupState((prev) => ({ ...prev, loading: false }))
    }
  }, [locale, router])

  return { newGroupState, addNewGroup }
}
