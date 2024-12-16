import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'

const Description = () => {
  const t = useTranslations('Description')

  return (
    <div className='flex flex-col gap-6'>
      <p className='text-gray-700 text-justify text-sm'>{t('paragraph-1')}</p>
      <Button className='w-full' asChild>
        <Link href='/'>{t('Start')}</Link>
      </Button>
      <p className='text-gray-700 text-justify text-sm'>{t('paragraph-2')}</p>
      <p className='text-gray-700 text-justify text-sm'>{t('paragraph-3')}</p>
    </div>
  )
}

export default Description
