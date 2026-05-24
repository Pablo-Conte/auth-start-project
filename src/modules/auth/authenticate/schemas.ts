import { z } from 'zod';

import { registry } from '@/shared/main/docs/registry';

export const AuthenticateSchema = registry.register(
    'Authenticate',
    z.object({
        email: z.string().email().openapi({ example: 'admin@example.com' }),
        password: z.string().min(6).openapi({ example: '123456' }),
    }),
);
