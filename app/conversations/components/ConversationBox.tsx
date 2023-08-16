'use client'

import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import clsx from 'clsx'

import Avatar from '@/components/Avatar'
import useOtherUser from '@/hooks/useOtherUser'
import { FullConversationType } from '@/types'
import AvatarGroup from '@/components/AvatarGroup'

interface ConversationBoxProps {
  data: FullConversationType
  selected?: boolean
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  const otherUser = useOtherUser(data)
  const session = useSession()
  const router = useRouter()

  console.log(data, 'ConvBox')

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`)
  }, [router, data])

  const lastMessage = useMemo(() => {
    const messages = data.messages || []

    return messages[messages.length - 1]
  }, [data.messages])

  // currentUser's email
  const userEmail = useMemo(
    () => session.data?.user?.email,
    [session.data?.user?.email]
  )

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false
    }

    // Array of users who has seen the message
    const seenArray = lastMessage.seen || []

    if (!userEmail) {
      return false
    }
    // currentUser has seen the message?
    return seenArray.filter((user) => user.email === userEmail).length !== 0
  }, [lastMessage, userEmail])

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return 'Sent a image'
    }

    if (lastMessage?.body) {
      return lastMessage?.body
    }

    return 'Started a conversation'
  }, [lastMessage])

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `
        w-full
        relative
        flex
        items-center
        space-x-3
        p-3
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
      `,
        selected ? 'bg-neutral-100' : 'bg-white'
      )}
    >
      {data.isGroup ? (
        // <div className="">Avatar Group</div>
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar user={otherUser} />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="text-md font-medium text-gray-900">
            {/*Conversation's name or otherUser's name */}
            {data.name || otherUser.name}
          </p>
          {lastMessage?.createdAt && (
            <p className="text-xs text-gray-400 font-light">
              {format(new Date(lastMessage.createdAt), 'p')}
            </p>
          )}
        </div>
        <p
          className={clsx(
            `
          truncate
          text-sm
        `,
            hasSeen ? 'text-gray-500' : 'text-black font-medium'
          )}
        >
          {/* TODO: last text message */}
          {lastMessageText}
        </p>
      </div>
    </div>
  )
}
export default ConversationBox
