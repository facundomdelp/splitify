import { ReactNode, useState } from 'react'

import { useTranslations } from 'next-intl'

import CalculateButton from '@/components/CalculateButton/CalculateButton'

import ResetExpensesButton from '../ResetExpenses'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

interface Props {
  children: [ReactNode, ReactNode]
  onBalancesClick?: () => void
  disabled?: boolean
  disabledExpenses?: boolean
  disabledBalances?: boolean
  onResetExpenses?: () => void
}

const ExpensesBalancesTabs = ({
  children,
  onBalancesClick,
  disabled,
  disabledExpenses,
  disabledBalances,
  onResetExpenses,
}: Props) => {
  const [tabValue, setTabValue] = useState<'expenses' | 'balances'>('expenses')

  const handleCalculateButton = () => {
    onBalancesClick?.()
    setTabValue('balances')
  }

  const t = useTranslations('ExpensesBalancesTabs')

  return (
    <Tabs
      value={tabValue}
      onValueChange={(value) => setTabValue(value as 'expenses' | 'balances')}
      className='flex w-full flex-1 flex-col gap-4'
    >
      <div className='relative flex'>
        <TabsList className='mx-auto scale-90 xs:scale-100'>
          <TabsTrigger className='w-[120px]' value='expenses' disabled={disabled || disabledExpenses}>
            {t('Expenses')}
          </TabsTrigger>
          <TabsTrigger
            className='w-[120px]'
            value='balances'
            onClick={onBalancesClick}
            disabled={disabled || disabledBalances}
          >
            {t('Balances')}
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent className='mx-4 flex h-full flex-1 flex-col gap-4' value='expenses'>
        {children[0]}

        <section className='flex gap-4'>
          {onResetExpenses && (
            <ResetExpensesButton
              handleResetExpenses={onResetExpenses}
              className='flex-1 basis-1/2'
              disabled={disabled || disabledBalances}
            />
          )}
          <CalculateButton
            onClick={handleCalculateButton}
            disabled={disabled || disabledBalances}
            className='flex-1 basis-1/2'
          />
        </section>
      </TabsContent>
      <TabsContent className='mx-4 mt-2 flex h-full flex-1 flex-col gap-4' value='balances'>
        {children[1]}
      </TabsContent>
    </Tabs>
  )
}

export default ExpensesBalancesTabs
