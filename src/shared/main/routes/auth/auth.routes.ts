import { Router } from 'express';

import { AuthenticateController } from '@/modules/auth/authenticate/AuthenticateController';
import { AuthenticateLogoffController } from '@/modules/auth/authenticateLogoff/AuthenticateLogoffController';
import { AuthenticateRefreshController } from '@/modules/auth/authenticateRefresh/AuthenticateRefreshController';

import { expressRouter as execute } from '../../middlewares';

const v1AuthRoutes = Router();

v1AuthRoutes.post('/', execute(new AuthenticateController()));
v1AuthRoutes.post(
    '/refresh-token',
    execute(new AuthenticateRefreshController()),
);
v1AuthRoutes.post('/logoff', execute(new AuthenticateLogoffController()));

export { v1AuthRoutes };
