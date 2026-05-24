import { z } from 'zod';

export const TokenPayloadSchema = z.object({
    userId: z.uuid(),
    roleName: z.string(),
});

export type TokenPayload = z.infer<typeof TokenPayloadSchema>;
