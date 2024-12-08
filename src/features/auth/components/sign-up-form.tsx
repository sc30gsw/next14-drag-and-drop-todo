'use client'

import '@/zod-error-map-utils'
import { Button, Card, Form, Loader, TextField } from '@/components/ui'
import { signUpSchema } from '@/features/auth/schema/signup-schema'
import { signUpAction } from '@/features/auth/server/sign-up-action'
import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { useActionState } from 'react'

export const SignUpForm = () => {
  const [lastResult, action, isPending] = useActionState(signUpAction, null)

  const [form, fields] = useForm({
    constraint: getZodConstraint(signUpSchema),
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signUpSchema })
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
          {...getInputProps(fields.name, { type: 'text' })}
          placeholder="Enter your name"
          label="Name"
          errorMessage={''}
          isDisabled={isPending}
        />
        <span id={fields.name.errorId} className="mt-1 text-sm text-red-500">
          {fields.name.errors}
        </span>

        <TextField
          {...getInputProps(fields.email, { type: 'email' })}
          placeholder="Enter your email"
          label="Email"
          errorMessage={''}
          isDisabled={isPending}
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
              {isPending && <Loader size="medium" aria-label="Signing up..." />}
              {isPending ? 'Signing up...' : 'Sign up'}
            </>
          )}
        </Button>
      </Card.Footer>
    </Form>
  )
}
