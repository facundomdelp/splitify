interface useHandleNavigationProps {
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const useHandleNavigation = ({ setDrawerOpen }: useHandleNavigationProps) => {
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { hash } = new URL(e.currentTarget.href)

    if (hash) {
      e.preventDefault()

      setTimeout(() => {
        const targetElement = document.querySelector(hash)
        targetElement?.scrollIntoView({ behavior: 'smooth' })
      }, 400)
    }

    setDrawerOpen(false)
  }

  return { handleNavigation }
}
