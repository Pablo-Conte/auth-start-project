import jwt from 'jsonwebtoken';
import { injectable } from 'tsyringe';

import { forbidden } from '@/shared/application';
import { SaveLogs } from '@/shared/application/save_logs';
import { prisma } from '@/shared/infra/database';

import { DTOAuthenticateLogoffUseCase } from './AuthenticateLogoff.types';
import { DecodedRefreshTokenSchema } from './schema';

@injectable()
class AuthenticateLogoffUseCase {
    async execute({
        refreshToken,
    }: DTOAuthenticateLogoffUseCase.Input): Promise<void> {
        SaveLogs.UseCaseTitle('AuthenticateLogoffUseCase (execute)');

        let parsedJwtDecoded: ReturnType<
            typeof DecodedRefreshTokenSchema.parse
        >;

        try {
            const jwtDecoded = jwt.verify(
                refreshToken,
                process.env.JWT_SECRET as string,
            );

            parsedJwtDecoded = DecodedRefreshTokenSchema.parse(jwtDecoded);
        } catch {
            throw forbidden({
                error_code: 'InvalidRefreshToken',
                error_msgs: {
                    InvalidRefreshToken: 'Invalid refresh token',
                },
            });
        }

        const foundRefreshToken = await prisma.refreshToken.findFirst({
            where: {
                userId: parsedJwtDecoded.userId,
                token: refreshToken,
            },
        });

        if (!foundRefreshToken) {
            throw forbidden({
                error_code: 'InvalidRefreshToken',
                error_msgs: {
                    InvalidRefreshToken: 'Invalid refresh token',
                },
            });
        }

        await prisma.refreshToken.delete({
            where: {
                id: foundRefreshToken.id,
            },
        });
    }
}

export { AuthenticateLogoffUseCase };
