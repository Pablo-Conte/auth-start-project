import { NextFunction, Request, Response } from 'express';

import { SaveLogs } from '@/shared/application/save_logs';

export function catchRequisition(
    request: Request,
    _response: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
) {
    SaveLogs.ExpressInput(request);
    next();
}
