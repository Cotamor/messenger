import Avatar from '@/components/Avatar'
import AvatarGroup from '@/components/AvatarGroup'
import useOtherUser from '@/hooks/useOtherUser'
import { FullConversationType } from '@/types'
import { Dialog, Transition } from '@headlessui/react'
import { Conversation, User } from '@prisma/client'
import clsx from 'clsx'
import { format } from 'date-fns'
import { Fragment, useMemo, useState } from 'react'
import { IoClose, IoTrash } from 'react-icons/io5'
import ConfirmModal from './ConfirmModal'

interface ProfileDrawerProps {
  data: Conversation & {
    users: User[]
  }
  isOpen: boolean
  onClose: () => void
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  data,
  isOpen,
  onClose,
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const otherUser = useOtherUser(data)

  const joindedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), 'PP')
  }, [otherUser.createdAt])

  const title = useMemo(() => {
    return data.name || otherUser.name
  }, [data.name, otherUser.name])

  // TODO: Active member
  const isActive = false

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`
    }

    return isActive ? 'Active' : 'Offline'
  }, [data, isActive])

  const dt = clsx('text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0')
  const dd = clsx('mt-1 text-sm text-gray-900 sm:col-span-2')

  return (
    <>
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      />
      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={onClose} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="fixed right-0 inset-y-0 max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="w-screen max-w-md bg-white h-full" >
                  <div className="flex flex-col overflow-y-auto py-6">
                    <button
                      type="button"
                      onClick={onClose}
                      className="absolute top-2 right-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span className="sr-only">Close panel</span>
                      <IoClose size={24} aria-hidden="true" />
                    </button>

                    <div className="relative w-full mt-6 flex-1 px-0 sm:px-6 flex flex-col items-center">
                      <div className="mb-2">
                        {data.isGroup ? (
                          <AvatarGroup users={data.users} />
                        ) : (
                          <Avatar user={otherUser} />
                        )}
                      </div>

                      <div className="">{title}</div>
                      <div className="text-sm text-gray-500">{statusText}</div>

                      <div
                        onClick={() => setConfirmOpen(true)}
                        className="flex flex-col items-center cursor-pointer hover:opacity-75 my-3"
                      >
                        <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
                          <IoTrash size={20} />
                        </div>
                        <div className="text-sm font-light text-neutral-600">
                          Delete
                        </div>
                      </div>
                      <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                        <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                          {/* Group members emails */}
                          {data.isGroup && (
                            <div>
                              <dt className={dt}>Emails</dt>
                              <dd className={dd}>
                                {data.users
                                  .map((user) => user.email)
                                  .join(', ')}
                              </dd>
                            </div>
                          )}
                          {!data.isGroup && (
                            <div>
                              <dt className={dt}>Email</dt>
                              <dd className={dd}>{otherUser.email}</dd>
                            </div>
                          )}
                          {!data.isGroup && (
                            <>
                              <hr />
                              <div>
                                <dt className={dt}>Joined</dt>
                                <dd className={dd}>
                                  <time dateTime={joindedDate}>
                                    {joindedDate}
                                  </time>
                                </dd>
                              </div>
                            </>
                          )}
                        </dl>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
export default ProfileDrawer
