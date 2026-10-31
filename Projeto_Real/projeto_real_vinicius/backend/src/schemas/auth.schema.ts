import * as z from "zod"

export const LoginBody = z.object({
    email: z.email(),
    password: z.string(),
})
