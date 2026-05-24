import { NextFunction, Request, Response } from 'express';

import { serverError } from '@/shared/application';
import { SaveLogs } from '@/shared/application/save_logs';

export async function getRequestIP(
    request: Request,
    _response: Response,
    next: NextFunction,
): Promise<void> {
    SaveLogs.MiddlewareTitle('getRequestIP');

    try {
        const ip = (request.headers['x-real-ip'] ||
            request.headers['x-forwarded-for'] ||
            request.ip) as string;

        request.user = {
            ip,
        };
        next();
    } catch (error) {
        throw serverError({
            error: new Error("Cannot reach user's ip"),
        });
    }
}
