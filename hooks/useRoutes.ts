import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

import { HiChat, HiUsers } from 'react-icons/hi'
import { HiArrowLeftOnRectangle } from 'react-icons/hi2'

const useRoutes = () => {
  const pathname = usePathname()

  const routes = useMemo(
    () => [
      {
        label: 'Chat',
        href: '/conversations',
        icon: HiChat,
        active: pathname === '/conversations',
      },
      {
        label: 'Users',
        href: '/users',
        icon: HiUsers,
      },
      {
        label: 'Logout',
        onClick: () => signOut(),
        href: '#',
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [pathname]
  )

  return routes
}

export default useRoutes
