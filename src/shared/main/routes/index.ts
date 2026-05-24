import { Router } from 'express';

import { v1AuthRoutes } from './auth/auth.routes';

const developmentRoutes = Router();

enum RouteTags {
    auth = '/auth',
    events = '/events',
    products = '/products',
}

// auth
developmentRoutes.use(RouteTags.auth, v1AuthRoutes);

export { developmentRoutes, RouteTags };
