import { getLoggedInUser } from '@/features/auth/server/action'
import { AddButton } from '@/features/todos/components/add-button'
import { TodoListSkeleton } from '@/features/todos/components/todo-list-skelton'
import { TodoListWrapper } from '@/features/todos/components/todo-list-wrapper'
import { todoToggleSearchParamsCache } from '@/type/search-params/todo-toggle-search-params'
import type { SearchParams } from 'nuqs/server'
import { Suspense } from 'react'

type HomeProps = {
  searchParams: Promise<SearchParams>
}

const Home = async ({ searchParams }: HomeProps) => {
  const { toggle } = await todoToggleSearchParamsCache.parse(searchParams)

  const user = await getLoggedInUser()

  return (
    <div className="flex flex-col justify-evenly gap-4 py-2 mx-10">
      <div className="w-full">
        <AddButton user={user} searchParamsToggle={toggle} />
      </div>
      {user ? (
        <Suspense fallback={<TodoListSkeleton />}>
          <TodoListWrapper />
        </Suspense>
      ) : (
        <div className="grid gap-12 grid-cols-3 mt-4">
          <div className="bg-slate-700 rounded-lg p-4 min-w-[300px]">
            <h3 className="text-white text-2xl font-bold">ToDos</h3>
          </div>
          <div className="bg-slate-700 rounded-lg p-4 min-w-[300px]">
            <h3 className="text-white text-2xl font-bold">Doing</h3>
          </div>
          <div className="bg-slate-700 rounded-lg p-4 min-w-[300px]">
            <h3 className="text-white text-2xl font-bold">Done</h3>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
