import { z } from 'zod';

const envSchema = z.object({
    // Database Configuration
    DB_DIRECT: z.string(),
    DATABASE_URL: z.string(),
    PRISMA_DEBUG: z.enum(['true', 'false']).default('false'),

    // Application Configuration
    API_VERSION: z.string().default('v1'),
    PORT: z.string().refine((value) => /^[0-9]+$/.test(value), {
        message: 'The PORT must be a number.',
    }),

    // JWT Configuration
    JWT_SECRET: z.string(),

    // Timezone
    TZ: z.string().default('America/Sao_Paulo'),

    // Meta Conversions API
    META_ENABLED: z.enum(['true', 'false']).default('false'),
    META_PIXEL_ID: z.string().optional(),
    META_ACCESS_TOKEN: z.string().optional(),
    META_API_VERSION: z.string().default('v21.0'),
    META_TEST_EVENT_CODE: z.string().optional(),

    // Google Ads API
    GOOGLE_ADS_ENABLED: z.enum(['true', 'false']).default('false'),
    GOOGLE_ADS_DEVELOPER_TOKEN: z.string().optional(),
    GOOGLE_ADS_CLIENT_ID: z.string().optional(),
    GOOGLE_ADS_CLIENT_SECRET: z.string().optional(),
    GOOGLE_ADS_REFRESH_TOKEN: z.string().optional(),
    GOOGLE_ADS_CUSTOMER_ID: z.string().optional(),
    GOOGLE_ADS_LOGIN_CUSTOMER_ID: z.string().optional(),
    GOOGLE_ADS_CONVERSION_ACTION_ID: z.string().optional(),
});

// Parse and validate environment variables
const parsedEnv = envSchema.parse(process.env);

// Assign the parsed environment variables to ProcessEnv
Object.assign(process.env, parsedEnv);

export type EnvTypes = z.infer<typeof envSchema>;
declare global {
    namespace NodeJS {
        interface ProcessEnv extends EnvTypes {}
    }
}
