'use client'

import Avatar from '@/components/Avatar'
import useOtherUser from '@/hooks/useOtherUser'
import { Conversation, User } from '@prisma/client'
import Link from 'next/link'
import { HiChevronLeft } from 'react-icons/hi'
import { HiEllipsisHorizontal } from 'react-icons/hi2'

interface HeaderProps {
  conversation: Conversation & {
    users: User[]
  }
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation)

  return (
    <div
      className="
      bg-white
      w-full
      flex
      items-center
      justify-between
      shadow-sm
      border-b-[1px]
      py-3
      px-4
      sm:px-4
      lg:px-6
    "
    >
      <div className="flex items-center gap-3">
        <Link
          href="/conversations"
          className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
        >
          <HiChevronLeft size={32} />
        </Link>
        {conversation.isGroup ? (
          <div className="">Avatar Group</div>
        ) : (
          <Avatar user={otherUser} />
        )}
        <div className="flex flex-col">
          <div className="">{conversation.name || otherUser.name}</div>
          <div className="text-sm font-light text-neutral-500">Offline...</div>
        </div>
      </div>
      <HiEllipsisHorizontal
        size={32}
        onClick={() => {}}
        className="text-sky-500 cursor-pointer hover:text-sky-600 transition"
      />
    </div>
  )
}
export default Header
