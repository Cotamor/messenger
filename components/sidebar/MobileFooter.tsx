'use client'

import useConversation from '@/hooks/useConversation'
import useRoutes from '@/hooks/useRoutes'
import clsx from 'clsx'
import MobileItem from './MobileItem'

const MobileFooter = () => {
  const routes = useRoutes()
  const { isOpen } = useConversation()

  if (isOpen) {
    return null
  }

  return (
    <div
      className={clsx(`
      fixed
      flex
      items-center
      justify-between
      w-full
      bottom-0
      z-40
      bg-white
      border-t-[1px]
      lg:hidden
    `)}
    >
      {routes.map((route) => (
        <MobileItem
          key={route.label}
          href={route.href}
          icon={route.icon}
          active={route.active}
          onClick={route.onClick}
        />
      ))}
    </div>
  )
}
export default MobileFooter
