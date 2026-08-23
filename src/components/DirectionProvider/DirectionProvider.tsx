'use client'

import { ReactNode } from 'react'

import { DirectionProvider as RadixDirectionProvider } from '@radix-ui/react-direction'

interface Props {
  dir: 'ltr' | 'rtl'
  children: ReactNode
}

/* Radix primitives default to dir="ltr" on their own root, which overrides the
   direction inherited from <html>. This hands them the real one */
const DirectionProvider = ({ dir, children }: Props) => {
  return <RadixDirectionProvider dir={dir}>{children}</RadixDirectionProvider>
}

export default DirectionProvider
