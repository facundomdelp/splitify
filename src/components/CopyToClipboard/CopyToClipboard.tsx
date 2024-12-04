'use client'

import { copyToClipboard } from '@/lib/functions/copyToClipboard'
import { Clipboard, CopyCheck } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import { useTranslations } from 'next-intl'

interface Props {
  copyString: string
}

const CopyToClipboard = ({ copyString }: Props) => {
  const [copied, setCopied] = useState(false)

  const handleCopyToClipboard = () => {
    copyToClipboard(copyString)

    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const t = useTranslations('CopyToClipboard')

  return (
    <Button className='flex-1 basis-28 text-sm font-medium items-center bg-green-500' onClick={handleCopyToClipboard}>
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
