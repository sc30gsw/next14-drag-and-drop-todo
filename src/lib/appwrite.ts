// https://appwrite.io/docs/tutorials/nextjs-ssr-auth/step-3
'use server'

import { AUTH_COOKIE } from '@/features/auth/constants'
import { cookies } from 'next/headers'
import { Account, Client } from 'node-appwrite'

export const createSessionClient = async () => {
  if (
    !(
      process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT &&
      process.env.NEXT_PUBLIC_APPWRITE_PROJECT
    )
  ) {
    throw new Error('Appwrite environment variables are not set')
  }

  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)

  const session = (await cookies()).get(AUTH_COOKIE)

  if (!session?.value) {
    throw new Error('No session')
  }

  client.setSession(session.value)

  return {
    get account() {
      return new Account(client)
    },
  }
}

// biome-ignore lint/suspicious/useAwait: Need to be async to use server actions
export const createAdminClient = async () => {
  if (
    !(
      process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT &&
      process.env.NEXT_PUBLIC_APPWRITE_PROJECT &&
      process.env.APPWRITE_API_KEY
    )
  ) {
    throw new Error('Appwrite environment variables are not set')
  }

  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
    .setKey(process.env.APPWRITE_API_KEY)

  return {
    get account() {
      return new Account(client)
    },
  }
}
