'use client'

import useConversation from '@/hooks/useConversation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { HiPhoto, HiPaperAirplane } from 'react-icons/hi2'
import MessageInput from './MessageInput'
import axios from 'axios'
import { CldUploadButton } from 'next-cloudinary'

const Form = () => {
  const { conversationId } = useConversation()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true })
    axios.post('/api/messages', {
      ...data,
      conversationId: conversationId,
    })
  }

  const handleUpload = (result: any) => {
    axios.post('/api/messages', {
      image: result?.info?.secure_url,
      conversationId: conversationId,
    })
  }

  return (
    <div
      className="
      w-full
      flex
      items-center
      gap-2
      lg:gap-4
      py-4
      px-4
      bg-white
      border-t
    "
    >
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="wr6s0bzy"
      >
        <HiPhoto size={30} className="text-sky-500" />
      </CldUploadButton>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex items-center gap-2 lg:gap-4 "
      >
        <MessageInput
          id="message"
          type="text"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />
        <button
          type="submit"
          className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition"
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  )
}
export default Form
