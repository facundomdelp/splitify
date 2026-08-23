import { ReactNode, useState } from 'react'

import { Tooltip as TooltipComponent, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import { TooltipArrow } from '@radix-ui/react-tooltip'

interface Props {
  children: ReactNode
  content: ReactNode
  arrow?: boolean
  openOnce?: boolean
  align?: 'center' | 'end' | 'start'
}

const Tooltip = ({ children, content, arrow, openOnce, align }: Props) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean | undefined>(undefined)

  const handleOpenChange = (open: boolean) => {
    if (openOnce && open) {
      setIsTooltipOpen(false)
    }
  }

  return (
    <TooltipProvider>
      <TooltipComponent defaultOpen={openOnce} open={isTooltipOpen} onOpenChange={handleOpenChange}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className='text-[10px] font-semibold' align={align} sideOffset={-4}>
          {arrow && <TooltipArrow className='fill-brand -mt-px' />}
          {content}
        </TooltipContent>
      </TooltipComponent>
    </TooltipProvider>
  )
}

export default Tooltip
