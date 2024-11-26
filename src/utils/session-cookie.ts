'use server'

import { AUTH_COOKIE } from '@/features/auth/constants'
import { cookies } from 'next/headers'

export const getSessionCookie = async () => {
  const cookieManager = await cookies()

  return cookieManager.get(AUTH_COOKIE)
}
