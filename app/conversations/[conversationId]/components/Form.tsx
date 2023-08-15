'use client'

import useConversation from '@/hooks/useConversation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { HiPhoto, HiPaperAirplane } from 'react-icons/hi2'
import MessageInput from './MessageInput'
import axios from 'axios'

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
    console.log(data, 'Message_Form')
    setValue('message', '', {shouldValidate: true})
    axios.post('/api/messages', {
      ...data,
      conversationId: conversationId
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
      <div className="">
        <HiPhoto size={30} className="text-sky-500" />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex items-center gap-2 lg:gap-4 "
      >
        <MessageInput
          type="text"
          id="message"
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
