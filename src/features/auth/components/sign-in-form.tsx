'use client'

import '@/zod-error-map-utils'
import { Button, Card, Form, Loader, TextField } from '@/components/ui'
import { loginSchema } from '@/features/auth/schema/login-schema'
import { signInAction } from '@/features/auth/server/sign-in-action'
import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { useActionState } from 'react'

export const SignInForm = () => {
  const [lastResult, action, isPending] = useActionState(signInAction, null)

  const [form, fields] = useForm({
    constraint: getZodConstraint(loginSchema),
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema })
    },
  })

  return (
    <Form
      {...getFormProps(form)}
      className="flex flex-col gap-4"
      action={action}
    >
      <Card.Content className="space-y-8">
        <TextField
          {...getInputProps(fields.email, { type: 'email' })}
          placeholder="Enter your email"
          label="Email"
          errorMessage={''}
          isDisabled={isPending}
          className="w-[350px]"
        />
        <span id={fields.email.errorId} className="mt-1 text-sm text-red-500">
          {fields.email.errors}
        </span>

        <TextField
          {...getInputProps(fields.password, { type: 'password' })}
          placeholder="Enter your password"
          label="Password"
          errorMessage={''}
          isDisabled={isPending}
        />
        <span
          id={fields.password.errorId}
          className="mt-1 text-sm text-red-500"
        >
          {fields.password.errors}
        </span>
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
