import { Skeleton } from '@/components/ui'

export const TodoListSkeleton = () => {
  return (
    <div className="grid gap-12 grid-cols-3 mt-4">
      <div className="bg-slate-700 rounded-lg p-4 min-w-[300px]">
        <h3 className="text-white text-2xl font-bold">ToDos</h3>
        <div className="flex flex-col gap-2 mt-2 h-full">
          <Skeleton className="h-10 w-full bg-slate-500" />
          <Skeleton className="h-10 w-full bg-slate-500" />
          <Skeleton className="h-10 w-full bg-slate-500" />
        </div>
      </div>
      <div className="bg-slate-700 rounded-lg p-4 min-w-[300px]">
        <h3 className="text-white text-2xl font-bold">Doing</h3>
        <div className="flex flex-col gap-2 mt-2 h-full">
          <Skeleton className="h-10 w-full bg-slate-500" />
          <Skeleton className="h-10 w-full bg-slate-500" />
          <Skeleton className="h-10 w-full bg-slate-500" />
        </div>
      </div>
      <div className="bg-slate-700 rounded-lg p-4 min-w-[300px]">
        <h3 className="text-white text-2xl font-bold">Done</h3>
        <div className="flex flex-col gap-2 mt-2 h-full">
          <Skeleton className="h-10 w-full bg-slate-500" />
          <Skeleton className="h-10 w-full bg-slate-500" />
          <Skeleton className="h-10 w-full bg-slate-500" />
        </div>
      </div>
    </div>
  )
}
