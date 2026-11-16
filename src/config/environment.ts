import dotenv from "dotenv"
import { z } from "zod"

dotenv.config()

const envSchema = z.object({
 NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
 PORT: z.coerce.number().default(5000),
 MONGODB_HOST: z.string(),
 MONGODB_USER: z.string(),
 MONGODB_PASSWORD: z.string(),
 MONGODB_DATABASE: z.string(),
 JWT_SECRET: z.string().min(32),
 JWT_EXPIRES_IN: z.string().default("15m"),
 CLIENT_URL: z.string().url()
})

const result = envSchema.safeParse(process.env)

if (!result.success) {
 console.error("Invalid environment configuration:", z.treeifyError(result.error))
 process.exit(1)
}

export const env = result.data