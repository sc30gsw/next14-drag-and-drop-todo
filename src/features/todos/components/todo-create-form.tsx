import { Button, Form, Loader, TextField } from '@/components/ui'
import { useTodoCreate } from '@/features/todos/api/use-todo-create'
import {
  type TodoSchema,
  todoSchema,
} from '@/features/todos/schema/todo-schema'
import { useSafeForm } from '@/hooks/use-safe-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconX } from 'justd-icons'
import { redirect } from 'next/navigation'
import type { Models } from 'node-appwrite'
import { Controller } from 'react-hook-form'

type TodoCreateFormProps = {
  user: Models.User<Models.Preferences> | null
  onToggle: () => void
}

export const TodoCreateForm = ({ user, onToggle }: TodoCreateFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useSafeForm<TodoSchema>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      name: '',
    },
  })

  const { mutate: createTodo, isPending } = useTodoCreate()

  const onSubmit = (data: TodoSchema) => {
    if (!user) {
      redirect('/sign-in')
    }

    createTodo(
      { json: data },
      {
        onSuccess: () => {
          reset()
        },
      },
    )
  }

  return (
    <div className="border border-neutral-400 bg-slate-700 rounded-md p-4 h-fit mt-4">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              isRequired={true}
              placeholder="タスクを入力..."
              errorMessage={errors.name?.message}
              isDisabled={isPending}
              className="border border-neutral-400 rounded-md bg-white"
              onFocus={() => {
                if (!user) {
                  redirect('/sign-in')
                }
              }}
            />
          )}
        />
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
