import { z } from 'zod'

export const todoSchema = z.object({
  name: z.string().min(1),
})

export type TodoSchema = z.infer<typeof todoSchema>
