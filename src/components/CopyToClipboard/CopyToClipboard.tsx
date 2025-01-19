'use client'

import { copyToClipboard } from '@/lib/functions/copyToClipboard'
import { Clipboard, CopyCheck } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface Props {
  copyString: string
  className?: string
  onClick?: () => void
}

const CopyToClipboard = ({ copyString, className, onClick }: Props) => {
  const [copied, setCopied] = useState(false)

  const handleCopyToClipboard = () => {
    copyToClipboard(copyString)

    setCopied(true)
    setTimeout(() => {
      setCopied(false)
      onClick?.()
    }, 3000)
  }

  const t = useTranslations('CopyToClipboard')

  return (
    <Button className={cn('text-sm font-medium items-center bg-green-500', className)} onClick={handleCopyToClipboard}>
      {!copied ? (
        <>
          <Clipboard className='size-[18px]' />
          <p>{t('Copy')}</p>
        </>
      ) : (
        <>
          <CopyCheck className='size-[18px]' />
          <p>{t('Copied!')}</p>
        </>
      )}
    </Button>
  )
}

export default CopyToClipboard
