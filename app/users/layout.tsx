import getUsers from '@/actions/getUsers'
import Sidebar from '@/components/sidebar/Sidebar'
import UserList from './components/UserList'

const UsersLayout = async ({ children }: { children: React.ReactNode }) => {
  const users = await getUsers()
  return (
    <Sidebar>
      <div className="h-full bg-green-200">
        <UserList items={users} />
        {/* Only visible wider than lg */}
        {children}
      </div>
    </Sidebar>
  )
}
export default UsersLayout
