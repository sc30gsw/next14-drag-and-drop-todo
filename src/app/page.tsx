'use client'
import { useDragAndDrop } from '@formkit/drag-and-drop/react'
import { IconDotGrid2X3 } from 'justd-icons'

const Home = () => {
  const todoItems = [
    'Schedule perm',
    'Rewind VHS tapes',
    'Make change for the arcade',
    'Get disposable camera developed',
    'Learn C++',
    'Return Nintendo Power Glove',
  ]
  const doingItems = ['Implement drag handles']
  const doneItems = ['Pickup new mix-tape from Beth']

  const [todoList, todos] = useDragAndDrop<HTMLUListElement, string>(
    todoItems,
    {
      group: 'kanban',
      dragHandle: '.kanban-handle',
      dropZone: true,
      sortable: true,
    },
  )

  const [doingList, doings] = useDragAndDrop<HTMLUListElement, string>(
    doingItems,
    {
      group: 'kanban',
      dragHandle: '.kanban-handle',
      dropZone: true,
      sortable: true,
    },
  )

  const [doneList, dones] = useDragAndDrop<HTMLUListElement, string>(
    doneItems,
    {
      group: 'kanban',
      dragHandle: '.kanban-handle',
      dropZone: true,
      sortable: true,
    },
  )
  return (
    <div className="flex justify-evenly gap-4 py-2">
      <div className="grid gap-12 grid-cols-3 mt-4 kanban-board">
        <div className="bg-slate-700 rounded-lg p-4">
          <h3 className="text-white text-2xl font-bold">ToDos</h3>
          <ul
            ref={todoList}
            className="flex flex-col gap-2 mt-2 kanban-column h-full"
          >
            {todos.map((todo) => (
              <li
                className="flex items-center gap-4 bg-slate-500 text-white rounded-md py-3 px-4 has-[:active]:bg-blue-500 kanban-item"
                key={todo}
              >
                <IconDotGrid2X3 className="kanban-handle cursor-grab active:cursor-grabbing" />
                {todo}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-700 rounded-lg p-4">
          <h3 className="text-white text-2xl font-bold">Doing</h3>
          <ul
            ref={doingList}
            className="flex flex-col gap-2 mt-2 kanban-column h-full"
          >
            {doings.map((doing) => (
              <li
                className="flex items-center gap-4 bg-slate-500 text-white rounded-md py-3 px-4 has-[:active]:bg-blue-500 kanban-item"
                key={doing}
              >
                <IconDotGrid2X3 className="kanban-handle cursor-grab active:cursor-grabbing" />
                {doing}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-700 rounded-lg p-4">
          <h3 className="text-white text-2xl font-bold">Done</h3>
          <ul
            ref={doneList}
            className="flex flex-col gap-2 mt-2 kanban-column h-full"
          >
            {dones.map((done) => (
              <li
                className="flex items-center gap-4 bg-slate-500 text-white rounded-md py-3 px-4 cursor-grab active:cursor-grabbing active:bg-blue-500 kanban-item"
                key={done}
              >
                <p className="kanban-handle line-through decoration-red-500 relative top-0 left-0 h-full w-full box-border">
                  {done}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* <Button>
        <IconPlus />
        リストを追加
      </Button> */}
    </div>
  )
}

export default Home
