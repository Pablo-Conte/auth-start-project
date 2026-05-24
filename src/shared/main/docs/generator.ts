import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { registry } from './registry';
import { version } from '@root/package.json';

export function generateOpenApiDocument() {
    const generator = new OpenApiGeneratorV3(registry.definitions);

    return generator.generateDocument({
        openapi: '3.0.0',
        info: {
            version: version,
            title: 'Joga Aurora API',
            description: 'API do projeto social Joga Aurora - Hub Comportamental',
        },
        servers: [
            {
                url: '/v1',
                description: 'Servidor v1',
            },
        ],
    });
}
