import 'dotenv/config'
import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(3336),
    STAC_API_BASE_URL: z.string().default("http://localhost:3333")
});

const envZod = envSchema.safeParse(process.env);

if (envZod.success === false) {
    console.error("Invalid environment variables", envZod.error.format());
    throw new Error("Invalid environment variables");
}


export const env = envZod.data