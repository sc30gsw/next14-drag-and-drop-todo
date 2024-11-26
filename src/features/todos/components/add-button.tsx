'use client'

import { Button } from '@/components/ui'
import { TodoCreateForm } from '@/features/todos/components/todo-create-form'
import { IconPlus } from 'justd-icons'
import { redirect } from 'next/navigation'
import type { Models } from 'node-appwrite'
import { parseAsBoolean, useQueryStates } from 'nuqs'

type AddButtonProps = {
  user: Models.User<Models.Preferences> | null
  searchParamsToggle: boolean
}

export const AddButton = ({ user, searchParamsToggle }: AddButtonProps) => {
  const [queryToggle, setQueryToggle] = useQueryStates(
    {
      toggle: parseAsBoolean.withDefault(searchParamsToggle),
    },
    {
      shallow: true,
      history: 'push',
    },
  )

  return queryToggle.toggle ? (
    <div className="w-fit">
      <TodoCreateForm
        user={user}
        onToggle={() => setQueryToggle({ toggle: false })}
      />
    </div>
  ) : (
    <Button
      intent="secondary"
      size="small"
      shape="circle"
      className="p-4 bg-neutral-500 mt-4 w-fit"
      onPress={() => {
        if (!user) {
          redirect('/sign-in')
        }

        setQueryToggle({ toggle: true })
      }}
    >
      <IconPlus />
      リストを追加
    </Button>
  )
}
