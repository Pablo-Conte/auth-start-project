import { z } from 'zod';

import { registry } from '@/shared/main/docs/registry';

import { AuthenticateSchema } from './schemas';

export const AuthenticateResponseSchema = registry.register(
    'AuthenticateResponse',
    z.object({
        accessToken: z.string().openapi({ example: 'eyJhbGciOiJIUzI1Ni...' }),
        refreshToken: z.string().openapi({ example: 'eyJhbGciOiJIUzI1Ni...' }),
    }),
);

registry.registerPath({
    method: 'post',
    path: '/auth',
    summary: 'Autenticar usuário',
    description:
        'Realiza o login do usuário e retorna os tokens de acesso e refresh.',
    tags: ['Auth'],
    request: {
        body: {
            content: {
                'application/json': {
                    schema: AuthenticateSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: 'Autenticação realizada com sucesso',
            content: {
                'application/json': {
                    schema: AuthenticateResponseSchema,
                },
            },
        },
        401: {
            description: 'Credenciais inválidas',
        },
    },
});
