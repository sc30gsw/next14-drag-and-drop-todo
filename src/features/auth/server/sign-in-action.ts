'use server'

import { AUTH_COOKIE } from '@/features/auth/constants'
import { loginSchema } from '@/features/auth/schema/login-schema'
import { client } from '@/lib/rpc'
import { parseWithZod } from '@conform-to/zod'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const signInAction = async (_: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, { schema: loginSchema })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  const res = await client.api.auth.login.$post({
    json: submission.value,
  })

  if (!res.ok) {
    // 409 is a conflict error, which means the email is already in use
    if (res.status === 409) {
      return submission.reply()
    }
    throw new Error('Failed to register')
  }

  const json = await res.json()

  if (!json.success) {
    return submission.reply()
  }

  const cookieStore = await cookies()
  cookieStore.set(AUTH_COOKIE, json.session.secret, {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })

  redirect('/')
}
