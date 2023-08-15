'use client'

import useConversation from "@/hooks/useConversation"
import { FullMessageType } from "@/types"
import { Message } from "@prisma/client"
import { useState } from "react"
import MessageBox from "./MessageBox"

interface BodyProps {
  initialMessages: FullMessageType[]
}

const Body:React.FC<BodyProps> = ({
  initialMessages = []
}) => {
  const [messages, setMessages] = useState(initialMessages)

  const {conversationId} = useConversation()



  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          key={message.id}
          data={message}
        />
      ))}
      <div className="pt-24" />
    </div>
  )
}
export default Body