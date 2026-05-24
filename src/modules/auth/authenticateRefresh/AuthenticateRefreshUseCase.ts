import jwt from 'jsonwebtoken';
import { injectable } from 'tsyringe';

import { forbidden } from '@/shared/application';
import { SaveLogs } from '@/shared/application/save_logs';
import { prisma } from '@/shared/infra/database';

import { DTOAuthenticateRefreshUseCase } from './AuthenticateRefresh.types';
import { DecodedRefreshTokenSchema } from './schema';

const ONE_HOUR_IN_SECONDS = 3600;
const ONE_DAY_IN_SECONDS = 86400;

@injectable()
class AuthenticateRefreshUseCase {
    async execute({
        refreshToken,
    }: DTOAuthenticateRefreshUseCase.Input): Promise<DTOAuthenticateRefreshUseCase.Output> {
        SaveLogs.UseCaseTitle('AuthenticateRefreshUseCase (execute)');

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

        const userData = {
            userId: parsedJwtDecoded.userId,
            roleName: parsedJwtDecoded.roleName,
        };

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

        const expiresInAccessToken = ONE_HOUR_IN_SECONDS;
        const expiresInRefreshToken = ONE_DAY_IN_SECONDS;

        const accessToken = jwt.sign(
            userData,
            process.env.JWT_SECRET as string,
            { expiresIn: expiresInAccessToken },
        );

        const newRefreshToken = jwt.sign(
            userData,
            process.env.JWT_SECRET as string,
            { expiresIn: expiresInRefreshToken },
        );

        const validateIfUserIsStillActive = await prisma.user.findUnique({
            where: {
                id: parsedJwtDecoded.userId,
                deletedAt: null,
                deactivatedAt: null,
            },
        });

        if (!validateIfUserIsStillActive) {
            throw forbidden({
                error_code: 'InvalidRefreshToken',
                error_msgs: {
                    InvalidRefreshToken: 'Invalid refresh token',
                },
            });
        }

        if (accessToken && newRefreshToken) {
            await prisma.$transaction([
                prisma.refreshToken.deleteMany({
                    where: {
                        userId: parsedJwtDecoded.userId,
                    },
                }),
                prisma.refreshToken.create({
                    data: {
                        token: newRefreshToken,
                        userId: parsedJwtDecoded.userId,
                        expiresAt: new Date(
                            Date.now() + expiresInRefreshToken * 1000,
                        ),
                    },
                }),
            ]);
        }

        return {
            accessToken,
            refreshToken: newRefreshToken,
        };
    }
}

export { AuthenticateRefreshUseCase };
