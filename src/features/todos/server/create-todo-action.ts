'use server'

import { AUTH_COOKIE } from '@/features/auth/constants'
import { todoSchema } from '@/features/todos/schema/todo-schema'
import { client } from '@/lib/rpc'
import { getSessionCookie } from '@/utils/session-cookie'
import { parseWithZod } from '@conform-to/zod'
import { redirect } from 'next/navigation'

export const createTodoAction = async (_: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, { schema: todoSchema })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  const sessionCookie = await getSessionCookie()

  if (!sessionCookie) {
    redirect('/sign-in')
  }

  const res = await client.api.todos.$post(
    {
      json: submission.value,
    },
    {
      headers: {
        // biome-ignore lint/style/useNamingConvention: cookie name is fixed
        Cookie: `${AUTH_COOKIE}=${sessionCookie.value}`,
        'Content-Type': 'application/json',
      },
    },
  )

  if (!res.ok) {
    throw new Error('Failed to create todo')
  }

  redirect('/?toggle=true')
}
