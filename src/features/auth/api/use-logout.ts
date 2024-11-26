import { client } from '@/lib/rpc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { InferResponseType } from 'hono'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type ResponseType = InferResponseType<(typeof client.api.auth.logout)['$post']>

export const useLogout = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const res = await client.api.auth.logout.$post()

      if (!res.ok) {
        throw new Error('Failed to log out')
      }

      return await res.json()
    },
    onSuccess: () => {
      toast.success('Logged out')
      router.refresh()
      queryClient.invalidateQueries({ queryKey: ['current'] })
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
    onError: () => {
      toast.error('Failed to log out')
    },
  })

  return mutation
}
