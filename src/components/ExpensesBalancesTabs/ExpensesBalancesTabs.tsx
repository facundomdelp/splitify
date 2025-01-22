import { ReactNode, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import CalculateButton from '@/components/CalculateButton/CalculateButton'
import { useTranslations } from 'next-intl'

interface Props {
  children: [ReactNode, ReactNode]
  onBalancesClick?: () => void
  disabled?: boolean
  disabledExpenses?: boolean
  disabledBalances?: boolean
}

const ExpensesBalancesTabs = ({ children, onBalancesClick, disabled, disabledExpenses, disabledBalances }: Props) => {
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
      className='w-full flex flex-col flex-1'
    >
      <div className='flex relative'>
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

      <TabsContent className='mt-4 flex-1 flex flex-col gap-4' value='expenses'>
        {children[0]}

        <CalculateButton onClick={handleCalculateButton} disabled={disabled || disabledBalances} />
      </TabsContent>
      <TabsContent className='mt-8 flex-1 flex flex-col' value='balances'>
        {children[1]}
      </TabsContent>
    </Tabs>
  )
}

export default ExpensesBalancesTabs
