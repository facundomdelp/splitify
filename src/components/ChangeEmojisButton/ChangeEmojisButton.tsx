import React from 'react'

import { useGetEmojiFromString } from '@/utils/hooks/useGetEmojiFromString'

import { useHandleChangeEmojis } from './hooks'

import { cn } from '@/lib/utils'

import { Button } from '../ui/button'

const ChangeEmojisButton = () => {
  const { handleChangeEmojis, rotate, isChangeEmojiClicked } = useHandleChangeEmojis()
  const getEmojiFromString = useGetEmojiFromString()

  return (
    <Button
      variant='outline'
      className='ml-auto flex h-[30px] w-[40px] justify-evenly px-2 py-1'
      onClick={handleChangeEmojis}
      tabIndex={-1}
    >
      {
        <div className={cn(rotate ? 'rotate-[360deg] transition-transform duration-500' : '')}>
          {!isChangeEmojiClicked ? '🤑' : getEmojiFromString('🤑')}
        </div>
      }
    </Button>
  )
}

export default ChangeEmojisButton
