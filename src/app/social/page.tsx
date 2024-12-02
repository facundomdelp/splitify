'use client'

import { sendGTMEvent } from '@next/third-parties/google'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SocialPage() {
  const router = useRouter()

  useEffect(() => {
    sendGTMEvent({ event: 'page_view' })
    setTimeout(() => router.push('/'), 100)
  }, [router])
}
