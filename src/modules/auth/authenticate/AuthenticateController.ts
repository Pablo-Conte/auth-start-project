import { Request } from 'express';
import { container } from 'tsyringe';

import { badRequest, Controller, HttpResponse, ok } from '@/shared/application';
import { SaveLogs } from '@/shared/application/save_logs';

import { DTOAuthenticateController } from './Authenticate.types';
import { AuthenticateUseCase } from './AuthenticateUseCase';
import { AuthenticateSchema } from './schemas';

class AuthenticateController extends Controller {
    async handle(request: Request): Promise<HttpResponse> {
        SaveLogs.ControllerTitle('AuthenticateController (handle)');

        const bodyParameters = await AuthenticateSchema.safeParseAsync(
            request.body,
        );

        if (!bodyParameters.success) {
            throw badRequest({
                error_code: 'InvalidInput',
                error_msgs: {
                    InvalidInput: bodyParameters.error.issues,
                },
            });
        }

        const authUseCase = container.resolve(AuthenticateUseCase);
        const newToken = await authUseCase.execute({
            email: bodyParameters.data.email,
            password: bodyParameters.data.password,
        });

        const output: DTOAuthenticateController.Output = { ...newToken };

        return ok(output);
    }
}

export { AuthenticateController };
