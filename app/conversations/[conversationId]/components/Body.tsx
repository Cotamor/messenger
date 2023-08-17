'use client'

import useConversation from '@/hooks/useConversation'
import { FullMessageType } from '@/types'
import { useEffect, useRef, useState } from 'react'
import MessageBox from './MessageBox'
import axios from 'axios'
import { pusherClient } from '@/libs/pusher'
import { find } from 'lodash'

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

  // Pusher
  useEffect(() => {
    pusherClient.subscribe(conversationId)
    bottomRef?.current?.scrollIntoView()

    const newMessageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`)

      setMessages((current) => {
        // preventing from duplicating the same message in case
        if (find(current, { id: message.id })) {
          return current
        }
        return [...current, message]
      })

      bottomRef?.current?.scrollIntoView()
    }

    const seenUpdateMessageHandler = (seenUpdatedMessage: FullMessageType) =>{
      setMessages((current) => current.map((currentMessage) => {
        // Replace with updated one
        if(currentMessage.id === seenUpdatedMessage.id) {
          return seenUpdatedMessage
        }
        return currentMessage
      }))
    }

    pusherClient.bind('messages:new', newMessageHandler)
    pusherClient.bind('message:update', seenUpdateMessageHandler)

    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind('messages:new', newMessageHandler)
      pusherClient.unbind('message:update', seenUpdateMessageHandler)
    }
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
