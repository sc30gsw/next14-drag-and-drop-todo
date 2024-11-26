import { client } from '@/lib/rpc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType } from 'hono'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type ResponseType = InferResponseType<(typeof client.api.auth.login)['$post']>
type RequestType = InferRequestType<(typeof client.api.auth.login)['$post']>

export const useLogin = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const res = await client.api.auth.login.$post({ json })

      if (!res.ok) {
        throw new Error('Failed to log in')
      }

      return await res.json()
    },
    onSuccess: () => {
      toast.success('Logged in')
      router.refresh()
      queryClient.invalidateQueries({ queryKey: ['current'] })
    },
    onError: () => {
      toast.error('Failed to log in')
    },
  })

  return mutation
}