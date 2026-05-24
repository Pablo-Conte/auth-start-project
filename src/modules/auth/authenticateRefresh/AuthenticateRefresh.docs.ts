import { registry } from '@/shared/main/docs/registry';

import { AuthenticateResponseSchema } from '../authenticate/Authenticate.docs';
import { AuthenticateRefreshBodySchema } from './schema';

registry.registerPath({
    method: 'post',
    path: '/auth/refresh-token',
    summary: 'Renovar Token de Acesso',
    description:
        'Utiliza um Refresh Token válido para gerar um novo Access Token.',
    tags: ['Auth'],
    request: {
        body: {
            content: {
                'application/json': {
                    schema: AuthenticateRefreshBodySchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: 'Token renovado com sucesso',
            content: {
                'application/json': {
                    schema: AuthenticateResponseSchema,
                },
            },
        },
        401: {
            description: 'Refresh Token inválido ou expirado',
        },
    },
});
