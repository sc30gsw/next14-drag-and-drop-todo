import { client } from '@/lib/rpc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType } from 'hono'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type ResponseType = InferResponseType<
  (typeof client.api.todos)[`:todoId`]['$delete'],
  200
>
type RequestType = InferRequestType<
  (typeof client.api.todos)[`:todoId`]['$delete']
>

export const useDeleteTodo = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const res = await client.api.todos[':todoId'].$delete({
        param,
      })

      if (!res.ok) {
        throw new Error('Failed to delete todo')
      }

      return await res.json()
    },
    onSuccess: () => {
      toast.success('Todo deleted')
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      router.refresh()
    },
    onError: () => {
      toast.error('Failed to update todo')
    },
  })

  return mutation
}
