'use client'

import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import Input from '@/components/inputs/Input'
import Button from '@/components/Button'

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
  const router = useRouter()
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoading, setIsLoading] = useState(false)

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER')
    } else {
      setVariant('LOGIN')
    }
  }, [variant])

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
    setIsLoading(true)

    if (variant === 'REGISTER') {
      // Axios Register
    }

    if (variant === 'LOGIN') {
      // Axios Login
    }
  }

  const socialAction = (action: string) => {
    setIsLoading(true)

    // Nextauth social sign in
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="name"
            label="Name"
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="email"
            label="Email address"
            type="email"
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="password"
            label="Password"
            type="password"
          />
          <div className="">
            <Button disabled={isLoading} fullWidth type='submit'>
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default AuthForm
