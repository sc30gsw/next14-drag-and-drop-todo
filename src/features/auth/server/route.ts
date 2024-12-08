import { AUTH_COOKIE } from '@/features/auth/constants'
import { loginSchema } from '@/features/auth/schema/login-schema'
import { signUpSchema } from '@/features/auth/schema/signup-schema'
import { createAdminClient } from '@/lib/appwrite'
import { sessionMiddleware } from '@/lib/session-middleware'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { deleteCookie } from 'hono/cookie'
import { ID } from 'node-appwrite'

const app = new Hono()
  .get('/current', sessionMiddleware, (c) => {
    const user = c.get('user')

    return c.json(user)
  })
  .post('/login', zValidator('json', loginSchema), async (c) => {
    const { email, password } = c.req.valid('json')

    const { account } = await createAdminClient()
    const session = await account.createEmailPasswordSession(email, password)

    return c.json({ success: true, session })
  })
  .post('/register', zValidator('json', signUpSchema), async (c) => {
    const { name, email, password } = c.req.valid('json')

    const { account } = await createAdminClient()
    await account.create(ID.unique(), email, password, name)
    const session = await account.createEmailPasswordSession(email, password)

    return c.json({ success: true, session })
  })
  .post('/logout', sessionMiddleware, async (c) => {
    const account = c.get('account')

    deleteCookie(c, AUTH_COOKIE)
    await account.deleteSession('current')

    return c.json({ success: true })
  })

export default app
