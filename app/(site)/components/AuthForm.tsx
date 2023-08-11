'use client'

import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
  const router = useRouter()
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoading,setIsLoading] = useState(false)

  const toggleVariant = useCallback(()=>{
    if(variant === 'LOGIN'){
      setVariant('REGISTER')
    } else {
      setVariant('LOGIN')
    }
  },[variant])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // TODO login and register functionality
  }

  const socialAction = () => {}

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
         

        </form>
      </div>
    </div>
  )
}
export default AuthForm
