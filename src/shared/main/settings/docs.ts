import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';

import { generateOpenApiDocument } from '@/shared/main/docs';

export default (app: Express): void => {
    const swaggerDocument = generateOpenApiDocument();

    const swaggerOptions = {
        swaggerOptions: {
            persistAuthorization: true,
            responseInterceptor: (response: any) => {
                if (
                    response.url.endsWith('/auth') &&
                    response.status === 200 &&
                    response.body.accessToken
                ) {
                    const { accessToken } = response.body;
                    (window as any).ui.preauthorizeApiKey('bearerAuth', accessToken);
                }
                return response;
            },
        },
    };

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
};
