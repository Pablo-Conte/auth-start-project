import { Request } from 'express';
import { container } from 'tsyringe';

import { Controller, HttpResponse, ok, badRequest } from '@/shared/application';
import { SaveLogs } from '@/shared/application/save_logs';

import { DTOAuthenticateRefreshController } from './AuthenticateRefresh.types';
import { AuthenticateRefreshUseCase } from './AuthenticateRefreshUseCase';
import { AuthenticateRefreshBodySchema } from './schema';

class AuthenticateRefreshController extends Controller {
    async handle(
        request: Request,
    ): Promise<HttpResponse<DTOAuthenticateRefreshController.Output>> {
        SaveLogs.ControllerTitle('AuthenticateRefreshController (handle)');

        const bodyParameters =
            await AuthenticateRefreshBodySchema.safeParseAsync(request.body);

        if (!bodyParameters.success) {
            throw badRequest({
                error_code: 'InvalidInput',
                error_msgs: {
                    InvalidInput: bodyParameters.error.issues,
                },
            });
        }

        const authenticateRefreshUseCase = container.resolve(
            AuthenticateRefreshUseCase,
        );

        const response = await authenticateRefreshUseCase.execute({
            refreshToken: bodyParameters.data.refreshToken,
        });

        return ok(response);
    }
}

export { AuthenticateRefreshController };
