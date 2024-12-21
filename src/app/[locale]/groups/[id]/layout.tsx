// import { redirect } from 'next/navigation'

export default async function GroupLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ id: string }> }>) {
  const awaitedParams = await params
  console.log('👽 ~ file: layout.tsx:11 ~ awaitedParams:', awaitedParams)

  // if (!isValidRoute) {
  //   redirect('/')
  // }

  return children
}
