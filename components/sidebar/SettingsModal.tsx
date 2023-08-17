'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { User } from '@prisma/client'
import { CldUploadButton } from 'next-cloudinary'
import Image from 'next/image'

import Button from '../Button'
import Input from '../inputs/Input'
import Modal from '../modals/Modal'
import axios from 'axios'
import { toast } from 'react-hot-toast'
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
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // console.log(currentUser, '&TEST_CURRENT_USER')

  // TODO: Profile Setting form and update personal infos

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  })

  const image = watch('image')

  const handleUpload = (result: any) => {
    console.log(result?.info)
    setValue('image', result.info.secure_url, { shouldValidate: true })
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    console.log(data)

    axios
      .post('/api/settings', data)
      .then(() => {
        router.refresh()
        onClose()
      })
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => setIsLoading(false))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Edit your public profile
            </p>

            <div className="flex flex-col mt-10 gap-y-8">
              <Input
                disabled={isLoading}
                label="Name"
                id="name"
                errors={errors}
                required
                register={register}
              />
              <div>
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
                <div className="flex items-center mt-2 gap-x-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      fill
                      alt="avatar"
                      src={
                        image || currentUser?.image || '/images/placeholder.jpg'
                      }
                      className="object-contain"
                    />
                  </div>
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="wr6s0bzy"
                    className="border p-2 rounded-md text-sm hover:bg-neutral-200"
                  >
                    Change
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end mt-6 gap-x-6">
          <Button disabled={isLoading} secondary onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Modal>
  )
}
export default SettingsModal
