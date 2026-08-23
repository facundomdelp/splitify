'use client'

import { ReactNode, createContext, useContext } from 'react'

import { useGetCurrency } from '@/utils/hooks/useCurrency'

const GroupCurrencyContext = createContext<string | undefined>(undefined)

interface Props {
  currency?: string
  children: ReactNode
}

const CurrencyProvider = ({ currency, children }: Props) => {
  return <GroupCurrencyContext.Provider value={currency}>{children}</GroupCurrencyContext.Provider>
}

export const useResolvedCurrency = () => {
  const groupCurrency = useContext(GroupCurrencyContext)
  const deviceCurrency = useGetCurrency()

  return groupCurrency ?? deviceCurrency
}

export default CurrencyProvider
