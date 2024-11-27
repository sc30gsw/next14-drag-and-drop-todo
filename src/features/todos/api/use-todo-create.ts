import { client } from '@/lib/rpc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType } from 'hono'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type ResponseType = InferResponseType<(typeof client.api.todos)['$post']>
type RequestType = InferRequestType<(typeof client.api.todos)['$post']>

export const useTodoCreate = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const res = await client.api.todos.$post({ json })

      if (!res.ok) {
        throw new Error('Failed to create todo')
      }

      return await res.json()
    },
    onSuccess: () => {
      toast.success('Todo created')
      router.refresh()
      queryClient.invalidateQueries({ queryKey: ['todos'], exact: true })
    },
    onError: () => {
      toast.error('Failed to create todo')
    },
    onMutate: async ({json}) => {
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
              documents: [...oldData.todos.documents, json],
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
