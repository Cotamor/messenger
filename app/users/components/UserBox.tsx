import Avatar from '@/components/Avatar'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface UserBoxProps {
  data: User
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    //TODO: Start a chat functionality
    setIsLoading(true)


  }

  return (
    <>
    {/* TODO: Add Loading Modal */}
    <div
      className="
      relative
      w-full
      flex
      items-center
      space-x-3
      bg-white
      p-3
      hover:bg-neutral-100
      rounded-lg
      transition
      cursor-pointer
    "
    >
      <Avatar user={data} />
      <div className="flex-1">
        <div className="focus:outline-none">
          {/* TODO: Why do we need this? */}
          <span className='absolute inset-0' aria-hidden='true' />
          <div className="flex justify-center items-center mb-1">
            <p className="text-sm font-medium text-gray-900">{data.name}</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
export default UserBox
