import compression from 'compression';
import cors from 'cors';
import { Express, json, urlencoded } from 'express';

import { getRequestIP } from '../middlewares';

const expressParserLimit = '5mb';

const setupMiddlewares = (app: Express): void => {
    app.use(getRequestIP);
    app.use(compression());
    app.use(cors());
    app.use(json({ limit: expressParserLimit }));
    app.use(urlencoded({ limit: expressParserLimit, extended: true }));
    app.disable('x-powered-by');
    app.use((req, res, next) => {
        if (!req.path.startsWith('/docs')) {
            res.type('json');
        }
        next();
    });
};

export { setupMiddlewares };
