import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

interface Props {
  children: React.ReactNode
}

const visuallyHidden = ({ children }: Props) => {
  return <VisuallyHidden.Root>{children}</VisuallyHidden.Root>
}

export default visuallyHidden
