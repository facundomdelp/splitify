import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SharePage() {
  const router = useRouter()

  useEffect(() => {
    window.gtag('event', 'page_view')
    setTimeout(() => router.push('/'), 100)
  }, [router])
}
