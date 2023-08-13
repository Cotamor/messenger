import getCurrentUser from "@/actions/getCurrentUser"

import DesktopSidebar from "./DesktopSidebar"

interface SidebarProps {
  children: React.ReactNode
}

const Sidebar = async({children}: SidebarProps) => {
  const currentUser = await getCurrentUser()

  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  )
}
export default Sidebar