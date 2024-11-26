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
  })

  return mutation
}
