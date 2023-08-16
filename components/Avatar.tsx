import { User } from '@prisma/client'
import Image from 'next/image'

interface AvatarProps {
  user?: User
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <div className="relative">
      <div className="relative rounded-full overflow-hidden h-9 w-9 md:h-10 md:w-10 shadow">
        <Image
          fill
          alt="avatar"
          src={user?.image || '/images/placeholder.jpg'}
          className="object-contain"
        />
      </div>
      <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 left-0 h-2 w-2 md:h-3 md:w-3" />
    </div>
  )
}
export default Avatar
