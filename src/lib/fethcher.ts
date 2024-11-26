import { AUTH_COOKIE } from '@/features/auth/constants'
import { getSessionCookie } from '@/utils/session-cookie'

// https://zenn.dev/chot/articles/e109287414eb8c
type FetchArgs = Parameters<typeof fetch>

export const fetcher = async <T>(
  url: FetchArgs[0],
  args?: FetchArgs[1],
): Promise<
  | { isSuccess: true; data: T }
  | { isSuccess: false; error: { message: string } }
> => {
  const sessionCookie = await getSessionCookie()

  if (!sessionCookie) {
    return { isSuccess: false, error: { message: 'Unauthorized' } }
  }

  const res = await fetch(url, {
    ...args,
    headers: {
      ...args?.headers,
      // biome-ignore lint/style/useNamingConvention: cookie name is fixed
      Cookie: `${AUTH_COOKIE}=${sessionCookie.value}`,
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch')
  }

  const json: T = await res.json()

  return { isSuccess: true, data: json }
}
