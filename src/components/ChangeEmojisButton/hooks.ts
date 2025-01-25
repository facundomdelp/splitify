import { useState } from 'react'

import { useSetMetadata } from '@/store/metadata-store'

export const useHandleChangeEmojis = () => {
  const [isChangeEmojiClicked, setIsChangeEmojiClicked] = useState(false)

  const [rotate, setRotate] = useState(false)
  const [metadata, setMetadata] = useSetMetadata()

  const handleChangeEmojis = () => {
    if (!isChangeEmojiClicked) {
      setTimeout(() => {
        setIsChangeEmojiClicked(true)
      }, 250)
    }

    setRotate(true)

    setTimeout(() => {
      setMetadata({
        ...metadata,
        emojiHash: Math.floor(Math.random() * 1000),
      })
    }, 250)

    setTimeout(() => setRotate(false), 500)
  }

  return { handleChangeEmojis, rotate, isChangeEmojiClicked }
}
