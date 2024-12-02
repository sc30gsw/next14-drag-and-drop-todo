'use client'

import { QueryProvider } from '@/components/query-provider'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import type { ReactNode } from 'react'
import { RouterProvider } from 'react-aria-components'
import { v4 as uuidv4 } from 'uuid'

declare module 'react-aria-components' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >
  }
}

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter()
  Cookies.set('nothing', uuidv4())

  return (
    <RouterProvider navigate={router.push}>
      <QueryProvider>
        <NuqsAdapter>{children}</NuqsAdapter>
      </QueryProvider>
    </RouterProvider>
  )
}
