import getUsers from '@/actions/getUsers'
import Sidebar from '@/components/sidebar/Sidebar'
import ConversationList from './components/ConversationList'

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const users = await getUsers()

  return (
    <Sidebar>
      <div className="w-full">
        <ConversationList
          users={users}
          title='Messages'
        />
        {children}
      </div>
    </Sidebar>
  )
}
