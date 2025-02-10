import { ReactNode } from 'react'

import { Expense as ExpenseType } from '@/types/expense-types'

import { cn } from '@/lib/utils'

import Amount from '@/components/Amount'

import { formatTimestampToDate } from '@/utils/functions/formatDate'
import { useGetEmojiFromString } from '@/utils/hooks/useGetEmojiFromString'

interface Props {
  optimistic?: boolean
  name: string
  amount: number
  title?: string
  date?: number
  action?: ReactNode
}

const Expense = ({ optimistic, name, amount, title, date, action }: ExpenseType & Props) => {
  const getEmojiFromString = useGetEmojiFromString()

  return (
    <li className={cn('flex min-w-0 items-center', optimistic ? 'text-gray-400' : '')}>
      <p className='mr-2 w-[20px] text-center'>{getEmojiFromString(name)}</p>
      <div className='flex min-w-0 flex-col'>
        <div className='flex min-w-0 items-center'>
          <p className='min-w-0 overflow-hidden text-ellipsis whitespace-nowrap'>{name}</p>
          <p className='whitespace-nowrap'>: ${<Amount>{amount}</Amount>}</p>
          {!optimistic && action}
        </div>
        {(title || date) && (
          <div className='flex min-w-0 items-center gap-1 text-xs text-gray-500'>
            {date && <p>{formatTimestampToDate(date)}</p>}
            {title && date && <p>-</p>}
            <p className='min-w-0 overflow-hidden text-ellipsis whitespace-nowrap'>{title}</p>
          </div>
        )}
      </div>
    </li>
  )
}

export default Expense
