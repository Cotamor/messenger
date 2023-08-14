import clsx from "clsx"
import Link from "next/link"
import { IconType } from "react-icons"

interface MobileItemProps {
  icon: IconType
  href: string
  onClick?: () => void
  active?: boolean
}

const MobileItem:React.FC<MobileItemProps> = ({
  icon: Icon,
  href,
  active,
  onClick,
}) => {

  const handleClick = () => {
    if(onClick) {
      return onClick()
    }
  }

  return (
    <Link href={href} onClick={handleClick} className={clsx(`
      group
      flex
      justify-center
      items-center
      p-4
      w-full
      text-gray-500
      hover:text-black
      hover:bg-gray-100
    `,
      active && 'bg-gray-100 text-black'
    )}>
      <Icon className="h-6 w-6" />
    </Link>
  )
}
export default MobileItem