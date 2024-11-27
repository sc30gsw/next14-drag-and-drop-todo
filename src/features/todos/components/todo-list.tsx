'use client'

import { Menu } from '@/components/ui'
import { useDeleteTodo } from '@/features/todos/api/use-todo-delete'
import { TodoEditModal } from '@/features/todos/components/todo-edit-modal'
import type { client } from '@/lib/rpc'
import { useDragAndDrop } from '@formkit/drag-and-drop/react'
import type { InferResponseType } from 'hono'
import {
  IconDotGrid2X3,
  IconDotsVertical,
  IconPencilBox,
  IconTrash,
} from 'justd-icons'
import { type Dispatch, useEffect, useReducer } from 'react'

type Todo = InferResponseType<
  typeof client.api.todos.$get
>['todos']['documents'][number]

type Props = {
  todoItems: InferResponseType<typeof client.api.todos.$get>
}

export const TodoList = ({ todoItems }: Props) => {
  const [todoList, todos, setValue] = useDragAndDrop<HTMLUListElement, Todo>(
    todoItems.todos.documents,
    {
      group: 'kanban',
      dragHandle: '.kanban-handle',
      dropZone: true,
      sortable: true,
    },
  )

  useEffect(() => {
    setValue(todoItems.todos.documents)
  }, [todoItems, setValue])

  const [doingList, doings] = useDragAndDrop<HTMLUListElement, Todo>([], {
    group: 'kanban',
    dragHandle: '.kanban-handle',
    dropZone: true,
    sortable: true,
  })

  const [doneList, dones] = useDragAndDrop<HTMLUListElement, Todo>([], {
    group: 'kanban',
    dragHandle: '.kanban-handle',
    dropZone: true,
    sortable: true,
  })

  const [modalTodo, dispatch] = useReducer(
    (
      state: { todoId: string; todoName: string; openEditModal: boolean },
      action: Partial<{
        todoId: string
        todoName: string
        openEditModal: boolean
      }>,
    ) => ({
      ...state,
      ...action,
    }),
    { todoId: '', todoName: '', openEditModal: false },
  )

  const { mutate: deleteTodo, isPending } = useDeleteTodo()

  return (
    <>
      <div className="grid gap-12 grid-cols-3 mt-4 w-full">
        <div className="bg-slate-700 rounded-lg p-4">
          <h3 className="text-white text-2xl font-bold">ToDos</h3>
          <ul ref={todoList} className="flex flex-col gap-2 mt-2 h-full">
            {todos.map((todo) => (
              <TodoItem
                key={todo.$id}
                item={todo}
                isPending={isPending}
                onDelete={() => deleteTodo({ param: { todoId: todo.$id } })}
                dispatch={dispatch}
              />
            ))}
          </ul>
        </div>

        <div className="bg-slate-700 rounded-lg p-4">
          <h3 className="text-white text-2xl font-bold">Doing</h3>
          <ul ref={doingList} className="flex flex-col gap-2 mt-2 h-full">
            {doings.map((doing) => (
              <TodoItem
                key={doing.$id}
                item={doing}
                isPending={isPending}
                onDelete={() => deleteTodo({ param: { todoId: doing.$id } })}
                dispatch={dispatch}
              />
            ))}
          </ul>
        </div>

        <div className="bg-slate-700 rounded-lg p-4">
          <h3 className="text-white text-2xl font-bold">Done</h3>
          <ul ref={doneList} className="flex flex-col gap-2 mt-2 h-full">
            {dones.map((done) => (
              <TodoItem
                key={done.$id}
                item={done}
                isPending={isPending}
                onDelete={() => deleteTodo({ param: { todoId: done.$id } })}
                dispatch={dispatch}
                isDone={true}
              />
            ))}
          </ul>
        </div>
      </div>

      <TodoEditModal
        isOpen={modalTodo.openEditModal}
        onOpenChange={() => dispatch({ openEditModal: false })}
        todoId={modalTodo.todoId}
        todoName={modalTodo.todoName}
      />
    </>
  )
}

type TodoItemProps = {
  item: Todo
  isPending: boolean
  onDelete: () => void
  dispatch: Dispatch<
    Partial<{
      todoId: string
      todoName: string
      openEditModal: boolean
    }>
  >
  isDone?: boolean
}

const TodoItem = ({
  item,
  isPending,
  onDelete,
  dispatch,
  isDone,
}: TodoItemProps) => {
  return (
    <li
      className="flex items-center gap-4 bg-slate-500 text-white rounded-md py-3 px-4 has-[:active]:bg-blue-500"
      key={item.$id}
    >
      <IconDotGrid2X3 className="kanban-handle cursor-grab active:cursor-grabbing" />
      <div className="flex justify-between items-center w-full">
        {isDone ? (
          <p className="line-through decoration-red-500 relative top-0 left-0 h-full w-full box-border">
            {item.name}
          </p>
        ) : (
          item.name
        )}

        <Menu>
          <Menu.Trigger isDisabled={isPending}>
            <IconDotsVertical className="z-10 cursor-pointer" />
          </Menu.Trigger>
          <Menu.Content>
            <Menu.Item
              className="hover:bg-neutral-200 hover:text-neutral-900 cursor-pointer flex justify-between items-center"
              onAction={() => {
                dispatch({
                  todoId: item.$id,
                  todoName: item.name,
                  openEditModal: true,
                })
              }}
              isDisabled={isPending}
            >
              編集
              <IconPencilBox />
            </Menu.Item>

            <Menu.Separator />
            <Menu.Item
              className="hover:bg-rose-400 hover:text-white cursor-pointer flex justify-between items-center"
              isDisabled={isPending}
              isDanger={true}
              onAction={() => {
                onDelete()
              }}
            >
              削除
              <IconTrash />
            </Menu.Item>
          </Menu.Content>
        </Menu>
      </div>
    </li>
  )
}
