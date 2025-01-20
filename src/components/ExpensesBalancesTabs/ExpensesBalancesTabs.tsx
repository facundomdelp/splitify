import { ReactNode, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import CalculateButton from '@/components/CalculateButton/CalculateButton'

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

  return (
    <Tabs
      value={tabValue}
      onValueChange={(value) => setTabValue(value as 'expenses' | 'balances')}
      className='w-full flex flex-col flex-1'
    >
      <div className='flex relative'>
        <TabsList className='mx-auto'>
          <TabsTrigger className='w-[120px]' value='expenses' disabled={disabled || disabledExpenses}>
            Expenses
          </TabsTrigger>
          <TabsTrigger
            className='w-[120px]'
            value='balances'
            onClick={onBalancesClick}
            disabled={disabled || disabledBalances}
          >
            Balances
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent className='mt-4 flex-1 flex flex-col gap-4' value='expenses'>
        {children[0]}

        <CalculateButton onClick={handleCalculateButton} disabled={disabled} />
      </TabsContent>
      <TabsContent className='mt-8 flex-1 flex flex-col' value='balances'>
        {children[1]}
      </TabsContent>
    </Tabs>
  )
}

export default ExpensesBalancesTabs
