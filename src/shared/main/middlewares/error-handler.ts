/* eslint-disable dot-notation */
import { NextFunction, Request, Response } from 'express';

import { HttpResponse, InputValidationError } from '@/shared/application';
import { SaveLogs } from '@/shared/application/save_logs';

interface ErrorType {
    error?: string;
    message?: string;
    detailed?: string;
    statusCode?: number;
}

export function errorHandler(
    err: HttpResponse | ErrorType,
    _request: Request,
    response: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    _next: NextFunction, // WARN: don't remove this, it's necessary for some reason!!!
) {
    const serverError = !err.statusCode || err.statusCode === 500;
    const inputValidationError = err instanceof InputValidationError;

    const message = err['data']?.message || err['message'] || null;
    const detailed = err['data']?.detailed || err['detailed'] || null;
    const errorCode = err['data']?.error || err['error'] || null;
    const statusCode = (
        serverError ? 500 : inputValidationError ? 422 : err.statusCode
    ) as number;

    let data = {};
    if (message) data['message'] = message;
    if (detailed) data['detailed'] = detailed;
    data['error'] =
        !errorCode || serverError ? 'Internal Server Error' : errorCode;

    SaveLogs.ErrorHandler(statusCode, data);
    return response.status(statusCode).json(data);
}
