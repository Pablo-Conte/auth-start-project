import { registry } from '@/shared/main/docs/registry';

import { AuthenticateLogoffBodySchema } from './schema';

registry.registerPath({
    method: 'post',
    path: '/auth/logoff',
    summary: 'Sair da aplicação',
    description: 'Invalida o Refresh Token do usuário.',
    tags: ['Auth'],
    request: {
        body: {
            content: {
                'application/json': {
                    schema: AuthenticateLogoffBodySchema,
                },
            },
        },
    },
    responses: {
        204: {
            description: 'Logoff realizado com sucesso',
        },
        401: {
            description: 'Token inválido',
        },
    },
});
