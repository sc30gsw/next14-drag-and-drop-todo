import auth from '@/features/auth/server/route'
import todos from '@/features/todos/server/route'

import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

const routes = app.route('/auth', auth).route('/todos', todos)

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes
