import { useRouter } from '@/i18n/routing'
import { CustomError } from '@/lib/errors/CustomErrors'
import { useState } from 'react'

interface useHandleNavigationProps {
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const useHandleNavigation = ({ setDrawerOpen }: useHandleNavigationProps) => {
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { hash } = new URL(e.currentTarget.href)

    if (hash) {
      e.preventDefault()

      setTimeout(() => {
        const targetElement = document.querySelector(hash)
        targetElement?.scrollIntoView({ behavior: 'smooth' })
      }, 400)
    }

    setDrawerOpen(false)
  }

  return { handleNavigation }
}

interface useAddNewGroupProps {
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const useAddNewGroup = ({ setDrawerOpen }: useAddNewGroupProps) => {
  const [newGroupState, setNewGroupState] = useState({ loading: false, error: false })

  const router = useRouter()

  const addNewGroup = async () => {
    setNewGroupState({ error: false, loading: true })

    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new CustomError(response.status, data)
      }

      router.push(`/groups/${data.group}`)
    } catch {
      setNewGroupState((prev) => ({ ...prev, error: true }))
    } finally {
      setDrawerOpen(false)
      setTimeout(() => {
        setNewGroupState((prev) => ({ ...prev, loading: false }))
      }, 500)
    }
  }

  return { newGroupState, addNewGroup }
}
