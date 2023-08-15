import getUsers from '@/actions/getUsers'
import Sidebar from '@/components/sidebar/Sidebar'
import ConversationList from './components/ConversationList'
import getConversations from '@/actions/getConversations'

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const users = await getUsers()
  const conversations = await getConversations()

  return (
    <Sidebar>
      <div className="w-full">
        <ConversationList
          users={users}
          title='Messages'
          initialItems={conversations}
        />
        {children}
      </div>
    </Sidebar>
  )
}
