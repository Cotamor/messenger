import Avatar from "@/components/Avatar"
import useOtherUser from "@/hooks/useOtherUser"
import { FullConversationType } from "@/types"
import clsx from "clsx"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"

interface ConversationBoxProps {
  data: FullConversationType
  selected: boolean
}

const ConversationBox:React.FC<ConversationBoxProps> = ({
  data,
  selected
}) => {
  const otherUser = useOtherUser(data)
  const session = useSession()
  const router = useRouter()
  
  console.log(data, 'ConvBox')

  const handleClick = useCallback(()=>{
    router.push(`/conversations/${data.id}`)
  },[router, data])

  //TODO: create lastMessage
  const lastMessage = useMemo(()=>{},[])
  
  //TODO: create userEmail
  const userEmail = useMemo(()=>{},[])
  
  //TODO: create hasSeen
  const hasSeen = useMemo(()=>{
    return false
  },[])
  
  //TODO: create lastMessageText
  const lastMessageText = useMemo(()=>{},[])

  return (
    <div
      onClick={handleClick}
      className={clsx(`
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
        <div className="">Avatar Group</div>
      ) : (
      <Avatar user={otherUser} />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="text-md font-medium text-gray-900">
            {/* data.name === Conversation's name */}
            {data.name || otherUser.name }
          </p>
          {/* TODO: date of laseMessage */}
          <p className="text-xs text-gray-400 font-light">2023.08.10...</p>
        </div>
        <p className={clsx(`
          truncate
          text-sm
        `,
          hasSeen ? 'text-gray-500' : 'text-black font-medium'
        )}>
          {/* TODO: last text message */}
          last text message.....
        </p>
      </div>
    </div>
  )
}
export default ConversationBox