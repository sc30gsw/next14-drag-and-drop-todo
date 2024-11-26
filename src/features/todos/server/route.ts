import { DATABASE_ID, TODO_ID } from '@/config'
import { todoSchema } from '@/features/todos/schema/todo-schema'
import { sessionMiddleware } from '@/lib/session-middleware'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { ID, Query } from 'node-appwrite'

const app = new Hono()
  .get('/', sessionMiddleware, async (c) => {
    const user = c.get('user')
    const databases = c.get('databases')

    const todos = await databases.listDocuments(DATABASE_ID, TODO_ID, [
      Query.equal('userId', user.$id),
      Query.orderDesc('$updatedAt'),
    ])

    return c.json({ todos })
  })
  .post('/', sessionMiddleware, zValidator('json', todoSchema), async (c) => {
    const databases = c.get('databases')
    const user = c.get('user')

    const { name } = c.req.valid('json')

    const todo = await databases.createDocument(
      DATABASE_ID,
      TODO_ID,
      ID.unique(),
      {
        name,
        userId: user.$id,
      },
    )

    return c.json({ todo })
  })
  .patch(
    '/:todoId',
    sessionMiddleware,
    zValidator('json', todoSchema),
    async (c) => {
      const databases = c.get('databases')
      const user = c.get('user')

      const { name } = c.req.valid('json')

      const todo = await databases.updateDocument(
        DATABASE_ID,
        TODO_ID,
        c.req.param('todoId'),
        {
          name,
          userId: user.$id,
        },
      )

      return c.json({ todo })
    },
  )
  .delete('/:todoId', sessionMiddleware, async (c) => {
    const databases = c.get('databases')

    await databases.deleteDocument(DATABASE_ID, TODO_ID, c.req.param('todoId'))

    return c.json({ message: 'Todo deleted' })
  })

export default app
