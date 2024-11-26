// https://appwrite.io/docs/tutorials/nextjs-ssr-auth/step-4
'use server'

import { createSessionClient } from '@/lib/appwrite'

export const getLoggedInUser = async () => {
  try {
    const { account } = await createSessionClient()
    return await account.get()
  } catch (err) {
    if (err instanceof Error) {
      // biome-ignore lint/suspicious/noConsole: need to log error
      console.error(err.message)
    }

    return null
  }
}
