import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().trim().min(1).email(),
  password: z
    .string()
    .trim()
    .min(8)
    .max(256)
    .regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/, {
      message: 'Password must contain both letters and numbers',
    }),
})

export type LoginSchema = z.infer<typeof loginSchema>
