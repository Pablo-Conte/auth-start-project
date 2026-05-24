import { NextFunction, Request, RequestHandler, Response } from 'express';

import { decodeToken, unauthorized } from '@/shared/application';
import { SaveLogs } from '@/shared/application/save_logs';

import { middlewareErrorMessages } from '.';

type Middleware = () => RequestHandler;

/**
 * @description Middleware to validate the user's access token
 * @operational Returns unauthorized if the token is not valid
 */
export const validateAuth: Middleware =
    () => async (request: Request, _response: Response, next: NextFunction) => {
        SaveLogs.MiddlewareTitle('validateAuth');

        const token = request.headers.authorization;
        // If there's no authorization header, throw an unauthorized error
        if (!token)
            throw unauthorized({
                error_code: 'TOKEN_NOT_FOUND',
                error_msgs: middlewareErrorMessages,
            });

        decodeToken(token);

        next();
    };
