import { Request } from 'express';
import { container } from 'tsyringe';

import {
    badRequest,
    Controller,
    HttpResponse,
    noContent,
} from '@/shared/application';
import { SaveLogs } from '@/shared/application/save_logs';

import { DTOAuthenticateLogoffController } from './AuthenticateLogoff.types';
import { AuthenticateLogoffUseCase } from './AuthenticateLogoffUseCase';
import { AuthenticateLogoffBodySchema } from './schema';

class AuthenticateLogoffController extends Controller {
    async handle(
        request: Request,
    ): Promise<HttpResponse<DTOAuthenticateLogoffController.Output>> {
        SaveLogs.ControllerTitle('AuthenticateLogoffController (handle)');

        const bodyParameters =
            await AuthenticateLogoffBodySchema.safeParseAsync(request.body);

        if (!bodyParameters.success) {
            throw badRequest({
                error_code: 'InvalidInput',
                error_msgs: {
                    InvalidInput: bodyParameters.error.issues,
                },
            });
        }

        const authenticateLogoffUseCase = container.resolve(
            AuthenticateLogoffUseCase,
        );

        await authenticateLogoffUseCase.execute({
            refreshToken: bodyParameters.data.refreshToken,
        });

        return noContent();
    }
}

export { AuthenticateLogoffController };
