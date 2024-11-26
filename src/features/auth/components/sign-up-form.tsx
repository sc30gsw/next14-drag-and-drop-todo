'use client'

import '@/zod-error-map-utils'
import { Button, Card, Form, Loader, TextField } from '@/components/ui'
import { useRegister } from '@/features/auth/api/use-register'
import {
  type SignUpSchema,
  signUpSchema,
} from '@/features/auth/schema/signup-schema'
import { useSafeForm } from '@/hooks/use-safe-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller } from 'react-hook-form'

export const SignUpForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useSafeForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const { mutate, isPending } = useRegister()

  const onSubmit = (data: SignUpSchema) => {
    mutate({ json: data })
  }

  return (
    <Form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Card.Content className="space-y-8">
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              label="Name"
              isRequired={true}
              placeholder="Enter your name"
              errorMessage={errors.name?.message}
              isDisabled={isPending}
              maxWidth="350px"
              width="350px"
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
              {...field}
              type="email"
              label="Email"
              isRequired={true}
              placeholder="Enter your email"
              errorMessage={errors.email?.message}
              isDisabled={isPending}
              maxWidth="350px"
              width="350px"
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <TextField
              {...field}
              type="password"
              label="Password"
              isRequired={true}
              placeholder="Enter your password"
              errorMessage={errors.password?.message}
              isDisabled={isPending}
              maxWidth="350px"
              width="350px"
            />
          )}
        />
      </Card.Content>
      <Card.Footer>
        <Button
          type="submit"
          className="w-full"
          isDisabled={isPending}
          isPending={isPending}
        >
          {({ isPending }) => (
            <>
              {isPending && <Loader size="medium" aria-label="Signing up..." />}
              {isPending ? 'Signing up...' : 'Sign up'}
            </>
          )}
        </Button>
      </Card.Footer>
    </Form>
  )
}
