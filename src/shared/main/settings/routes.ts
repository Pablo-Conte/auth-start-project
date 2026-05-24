import { Express } from 'express';

import { developmentRoutes } from '@/shared/main/routes';
import { version as pckVersion } from '@root/package.json';

import { catchRequisition } from '../middlewares/catch-requisition';
import { errorHandler } from '../middlewares/error-handler';

const setupRoutes = (app: Express): void => {
    /**
     * Middleware para capturar Requisição
     */
    app.use(catchRequisition);

    /**
     * Rotas da API (v1)
     */
    app.use('/v1', developmentRoutes);

    /**
     * Rota de status da API
     */
    app.get('/', (_req, res) => {
        res.status(200).send({
            api: 'Template API Projeto Aurora',
            status: 'OK',
            current_version: pckVersion,
        });
    });

    /**
     * Middleware para capturar Erros
     */
    app.use(errorHandler);
};

export { setupRoutes };
