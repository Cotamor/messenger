import EmptyState from '@/components/EmptyState'

const Users = () => {
  // Only visible wider than lg screen
  return (
    <div className="hidden lg:block lg:pl-80 h-full">
      <EmptyState />
    </div>
  )
}
export default Users
