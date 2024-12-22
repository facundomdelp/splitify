// import { redirect } from 'next/navigation'

// Env Variables for using a different collection for development
// Responsiveness for Groups

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
