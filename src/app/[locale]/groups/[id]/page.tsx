'use client'

import { useGetGroup } from './hooks'

const GroupPage = () => {
  const { loading, error, groups } = useGetGroup()
  console.log('👽 ~ file: page.tsx:9 ~ GroupPage ~ groups:', groups)
  console.log('👽 ~ file: page.tsx:9 ~ GroupPage ~ loading:', loading)
  console.log('👽 ~ file: page.tsx:9 ~ GroupPage ~ error:', error)

  return <main className='w-full p-6 text-dark max-w-[600px]'></main>
}

export default GroupPage
