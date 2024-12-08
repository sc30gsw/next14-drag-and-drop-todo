import { Button, Form, Loader, TextField } from '@/components/ui'
import { todoSchema } from '@/features/todos/schema/todo-schema'
import { createTodoAction } from '@/features/todos/server/create-todo-action'
import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { IconX } from 'justd-icons'
import { redirect } from 'next/navigation'
import type { Models } from 'node-appwrite'
import { useActionState } from 'react'

type TodoCreateFormProps = {
  user: Models.User<Models.Preferences> | null
  onToggle: () => void
}

export const TodoCreateForm = ({ user, onToggle }: TodoCreateFormProps) => {
  const [lastResult, action, isPending] = useActionState(createTodoAction, null)
  const [form, fields] = useForm({
    constraint: getZodConstraint(todoSchema),
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: todoSchema })
    },
  })

  return (
    <div className="border border-neutral-400 bg-slate-700 rounded-md p-4 h-fit mt-4">
      <Form {...getFormProps(form)} action={action}>
        <TextField
          {...getInputProps(fields.name, { type: 'text' })}
          placeholder="Enter your task"
          label="Task"
          errorMessage={''}
          onFocus={() => {
            if (!user) {
              redirect('/sign-in')
            }
          }}
          isDisabled={isPending}
          className="[&>label]:text-white"
        />
        <span id={fields.name.errorId} className="mt-1 text-sm text-red-500">
          {fields.name.errors}
        </span>
        <div className="flex justify-start mt-2 gap-2">
          <Button
            type="submit"
            size="small"
            isDisabled={isPending}
            isPending={isPending}
          >
            {({ isPending }) => (
              <>
                {isPending && (
                  <Loader size="medium" aria-label="タスクを追加中..." />
                )}
                {isPending ? 'タスクを追加中...' : 'タスクを追加'}
              </>
            )}
          </Button>
          <Button
            isDisabled={isPending}
            size="square-petite"
            appearance="outline"
            onPress={onToggle}
            className={
              'rounded-full text-white bg-transparent border-none hover:border-none hover:bg-transparent hover:opacity-75'
            }
          >
            <IconX />
          </Button>
        </div>
      </Form>
    </div>
  )
}
