'use client'

import { User } from "@prisma/client"

interface UserListProps {
  items: User[]
}

const UserList:React.FC<UserListProps> = ({
  items
}) => {
  return (
    <div>
      {items.map((item) => (
        <div className="" key={item.id}>
          {item.name}
        </div>
      ))}
    </div>
  )
}
export default UserList