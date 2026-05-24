import express from 'express';
import { setupRoutes } from '@/shared/main/settings/routes';

import '@/shared/main/settings/env';
import setupDocs from './docs';
import { setupMiddlewares } from './middlewares';

const app = express();

try {
    setupMiddlewares(app);
    setupDocs(app);
    setupRoutes(app);
} catch (err) {
    console.error('Erro ao configurar app:', err);
    process.exit(1);
}

export { app };
