import { TodoList } from '@/features/todos/components/todo-list'
import { fetcher } from '@/lib/fethcher'
import { client } from '@/lib/rpc'
import type { InferResponseType } from 'hono'
import { redirect } from 'next/navigation'

const url = client.api.todos.$url()
type ResponseType = InferResponseType<typeof client.api.todos.$get>

export const TodoListWrapper = async () => {
  const res = await fetcher<ResponseType>(url, {
    next: { tags: ['todos'] },
  })

  if (!res.isSuccess) {
    redirect('/sign-in')
  }

  return <TodoList todoItems={res.data} />
}
