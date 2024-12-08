'use client'

import '@/zod-error-map-utils'
import { Button, Card, Form, Loader, TextField } from '@/components/ui'
import { useLogin } from '@/features/auth/api/use-login'
import {
  type LoginSchema,
  loginSchema,
} from '@/features/auth/schema/login-schema'
import { useSafeForm } from '@/hooks/use-safe-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller } from 'react-hook-form'

export const SignInForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useSafeForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { mutate, isPending } = useLogin()

  const onSubmit = (data: LoginSchema) => {
    mutate({ json: data })
  }

  return (
    <Form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Card.Content className="space-y-8">
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
              {isPending && <Loader size="medium" aria-label="Signing in..." />}
              {isPending ? 'Signing in...' : 'Sign in'}
            </>
          )}
        </Button>
      </Card.Footer>
    </Form>
  )
}
