import { ReactNode } from 'react'

import { Expense as ExpenseType } from '@/types/expense-types'

import { cn } from '@/lib/utils'

import Amount from '@/components/Amount'

import { formatTimestampToDate } from '@/utils/functions/formatDate'
import { useGetEmojiFromString } from '@/utils/hooks/useGetEmojiFromString'

import { UsersRound } from 'lucide-react'

interface Props {
  optimistic?: boolean
  name: string
  amount: number
  title?: string
  date?: number
  sharers?: string[]
  action?: ReactNode
}

const Expense = ({ optimistic, name, amount, title, date, sharers, action }: ExpenseType & Props) => {
  const getEmojiFromString = useGetEmojiFromString()

  return (
    <li className={cn('flex min-w-0 items-center', optimistic ? 'text-muted-foreground' : '')}>
      <p className='me-2 w-[20px] text-center'>{getEmojiFromString(name)}</p>
      <div className='flex min-w-0 flex-col'>
        <div className='flex min-w-0 items-center'>
          <p className='min-w-0 overflow-hidden text-ellipsis whitespace-nowrap'>{name}</p>
          <p className='whitespace-nowrap'>
            : <Amount>{amount}</Amount>
          </p>
          {!optimistic && action}
        </div>
        {(title || date) && (
          <div className='text-muted-foreground flex min-w-0 items-center gap-1 text-xs'>
            {date && <p>{formatTimestampToDate(date)}</p>}
            {title && date && <p>-</p>}
            <p className='min-w-0 overflow-hidden text-ellipsis whitespace-nowrap'>{title}</p>
          </div>
        )}
        {sharers && (
          <div className='text-muted-foreground flex min-w-0 items-center gap-1 text-xs'>
            <UsersRound className='text-brand-muted size-3 shrink-0' />
            <p className='min-w-0 overflow-hidden text-ellipsis whitespace-nowrap'>{sharers.join(', ')}</p>
          </div>
        )}
      </div>
    </li>
  )
}

export default Expense
