import { client } from '@/lib/rpc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType } from 'hono'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type ResponseType = InferResponseType<
  (typeof client.api.todos)[`:todoId`]['$patch'],
  200
>
type RequestType = InferRequestType<
  (typeof client.api.todos)[`:todoId`]['$patch']
>

export const useUpdateTodo = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const res = await client.api.todos[':todoId'].$patch({
        json,
        param,
      })

      if (!res.ok) {
        throw new Error('Failed to update todo')
      }

      return await res.json()
    },
    onSuccess: ({ todo }) => {
      toast.success('Todo updated')
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      queryClient.invalidateQueries({ queryKey: ['todos', todo.$id] })
      router.refresh()
    },
    onError: () => {
      toast.error('Failed to update todo')
    },
    onMutate: async ({ json, param }) => {
      // 現在のTodoクエリをキャンセル
      await queryClient.cancelQueries({ queryKey: ['todos'] })

      // 更新前のデータをスナップショット
      const previousTodos = queryClient.getQueryData(['todos'])

      // 楽観的更新を実行
      queryClient.setQueryData(
        ['todos'],
        (
          oldData: InferResponseType<typeof client.api.todos.$get> | undefined,
        ) => {
          if (!oldData) {
            return oldData
          }

          return {
            ...oldData,
            todos: {
              ...oldData.todos,
              documents: oldData.todos.documents.map((todo) =>
                todo.$id === param.todoId ? { ...todo, ...json } : todo,
              ),
            },
          }
        },
      )

      // エラー時にロールバックするための関数を返す
      return { previousTodos }
    },
  })

  return mutation
}
