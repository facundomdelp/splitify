'use client'

import { formatAmount } from '@/utils/functions/formatAmount'

interface Props {
  children: number
  fractionDigits?: number
}

const Amount = ({ children, fractionDigits }: Props) => {
  return <>{formatAmount(children, navigator.language || navigator.languages[0], fractionDigits)}</>
}

export default Amount
