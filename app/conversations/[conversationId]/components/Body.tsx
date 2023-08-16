'use client'

import useConversation from '@/hooks/useConversation'
import { FullMessageType } from '@/types'
import { useEffect, useRef, useState } from 'react'
import MessageBox from './MessageBox'
import axios from 'axios'

interface BodyProps {
  initialMessages: FullMessageType[]
}

const Body: React.FC<BodyProps> = ({ initialMessages = [] }) => {
  const bottomRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState(initialMessages)

  const { conversationId } = useConversation()

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
  }, [conversationId])

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          key={message.id}
          data={message}
          isLast={i === messages.length - 1}
        />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  )
}
export default Body
