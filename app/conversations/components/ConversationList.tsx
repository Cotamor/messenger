'use client'

import useConversation from '@/hooks/useConversation'
import { FullConversationType } from '@/types'
import { User } from '@prisma/client'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { MdOutlineGroupAdd } from 'react-icons/md'
import ConversationBox from './ConversationBox'

interface ConversationListProps {
  users: User[]
  initialItems: FullConversationType[]
  title?: string
}

const ConversationList: React.FC<ConversationListProps> = ({
  users,
  initialItems,
  title,
}) => {
  const [items, setItems] = useState(initialItems)

  const router = useRouter()
  const session = useSession()

  const { conversationId, isOpen } = useConversation()

  return (
    <>
      {/* TODO: Add Group chat modal */}
      <aside
        className={clsx(
          `
      fixed
      inset-y-0
      pb-20
      lg:pb-0
      lg:left-20
      lg:w-80
      lg:block
      overflow-y-auto
      border-r
      border-gray-200
    `,
          isOpen ? 'hidden' : 'block w-full left-0'
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800">Message</div>
            <div className="rounded-ful p-2 bg-gray-100 text-gray-600">
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          <div className="">
            {/* TODO: Conversation Box */}
            {items.map((item) => (
              <ConversationBox
                key={item.id}
                data={item}
                selected={conversationId === item.id}
              />
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}
export default ConversationList
