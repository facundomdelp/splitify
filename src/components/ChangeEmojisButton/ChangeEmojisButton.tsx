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
      className='flex w-[40px] h-[30px] py-1 px-2 ml-auto justify-evenly'
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
