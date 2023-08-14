'use client'

import { User } from '@prisma/client'
import Modal from '../modals/Modal'

interface SettingsModalProps {
  isOpen?: boolean
  onClose: () => void
  currentUser: User
}
const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
}) => {
  console.log(currentUser, '&TEST_CURRENT_USER')

  // TODO: Profile Setting form and update personal infos

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="">modal content</div>
    </Modal>
  )
}
export default SettingsModal
