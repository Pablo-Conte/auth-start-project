import { NextFunction, Request, RequestHandler, Response } from 'express';

import { decodeToken, forbidden } from '@/shared/application';
import { SaveLogs } from '@/shared/application/save_logs';

import { middlewareErrorMessages } from '.';

type RolePattern = string; // 'admin_backoffice' | 'admin' | 'user:TEACHER' | 'user:PSYCHOLOGIST' | 'user:PROJECT_WORKER'

/**
 * @description Middleware to validate the user's role.
 * Accepts role patterns like 'admin_backoffice', 'admin', or 'user:TEACHER'.
 * A user passes if their roleName matches any pattern, or if the pattern is
 * 'user:TYPE' and their roleName is 'user' with the matching type.
 */
export const validateRole =
    (allowedPatterns: RolePattern[]): RequestHandler =>
    async (request: Request, _response: Response, next: NextFunction) => {
        SaveLogs.MiddlewareTitle('validateRole');

        const token = request.headers.authorization;
        const { roleName } = decodeToken(token);

        const isAllowed = allowedPatterns.some((pattern) => {
            if (pattern.includes(':')) {
                const [role, requiredType] = pattern.split(':');
                return roleName === role;
            }
            return roleName === pattern;
        });

        if (!isAllowed) {
            throw forbidden({
                error_code: 'ACCESS_DENIED',
                error_msgs: middlewareErrorMessages,
            });
        }

        next();
    };
