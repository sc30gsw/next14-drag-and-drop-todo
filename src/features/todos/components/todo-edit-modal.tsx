import { Button, Form, Loader, Modal, TextField } from '@/components/ui'
import { useUpdateTodo } from '@/features/todos/api/use-update-todo'
import {
  type TodoSchema,
  todoSchema,
} from '@/features/todos/schema/todo-schema'
import { useSafeForm } from '@/hooks/use-safe-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Controller } from 'react-hook-form'

type TodoEditModalProps = {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  todoId: string
  todoName: string
}

export const TodoEditModal = ({
  isOpen,
  onOpenChange,
  todoId,
  todoName,
}: TodoEditModalProps) => {
  const { mutate: updateTodo, isPending } = useUpdateTodo()

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useSafeForm<TodoSchema>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      name: todoName,
    },
  })

  useEffect(() => {
    setValue('name', todoName)
  }, [todoName, setValue])

  const onSubmit = (data: TodoSchema) => {
    updateTodo(
      { json: data, param: { todoId } },
      {
        onSuccess: () => {
          reset()
          onOpenChange(false)
        },
      },
    )
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>{todoName}を更新</Modal.Title>
          <Modal.Description>タスクを更新します。</Modal.Description>
        </Modal.Header>
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
              />
            )}
          />
          <Modal.Footer>
            <Modal.Close>Cancel</Modal.Close>
            <Button
              type="submit"
              size="small"
              isDisabled={isPending}
              isPending={isPending}
            >
              {({ isPending }) => (
                <>
                  {isPending && (
                    <Loader size="medium" aria-label="タスクを更新中..." />
                  )}
                  {isPending ? 'タスクを更新中...' : 'タスクを更新'}
                </>
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Content>
    </Modal>
  )
}
