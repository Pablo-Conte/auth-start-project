import { z } from 'zod';

import { registry } from '@/shared/main/docs/registry';

export const AuthenticateRefreshBodySchema = registry.register(
    'AuthenticateRefreshBody',
    z.object({
        refreshToken: z
            .string()
            .min(1)
            .openapi({ example: 'eyJhbGciOiJIUzI1Ni...' }),
    }),
);

export const DecodedRefreshTokenSchema = z.object({
    userId: z.string(),
    roleName: z.string().optional(),
});
