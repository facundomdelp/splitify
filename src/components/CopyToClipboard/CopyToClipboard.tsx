'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'

import { copyToClipboard } from '@/utils/functions/copyToClipboard'

import { Clipboard, CopyCheck } from 'lucide-react'

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
    onClick?.()

    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  const t = useTranslations('CopyToClipboard')

  return (
    <Button className={cn('items-center bg-green-500 text-sm font-medium', className)} onClick={handleCopyToClipboard}>
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
