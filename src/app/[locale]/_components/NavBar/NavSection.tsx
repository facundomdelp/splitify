import { slugify } from '@/lib/functions/slugify'
import { ReactNode, useMemo } from 'react'

interface Props {
  title: string
  children: ReactNode
}

const NavSection = ({ title, children }: Props) => {
  const titleId = useMemo(() => `title-${slugify(title)}`, [title])

  return (
    <section aria-labelledby={titleId}>
      <h2 id={titleId} className='font-bold text-gray-700 pb-2'>
        {title}
      </h2>
      <ul className='flex flex-col'>{children}</ul>
    </section>
  )
}

export default NavSection
