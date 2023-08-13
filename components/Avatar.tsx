import { User } from '@prisma/client'
import Image from 'next/image'

interface AvatarProps {
  user: User
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <div className="relative rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11 ">
      <Image fill alt="avatar" src={user?.image || '/images/placeholder.jpg'} />
    </div>
  )
}
export default Avatar
