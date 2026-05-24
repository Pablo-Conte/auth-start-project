import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { injectable } from 'tsyringe';

import { forbidden } from '@/shared/application';
import { SaveLogs } from '@/shared/application/save_logs';
import { prisma } from '@/shared/infra/database';

import { DTOAuthenticateUseCase } from './Authenticate.types';

const ONE_HOUR_IN_SECONDS = 3600;
const ONE_DAY_IN_SECONDS = 86400;

@injectable()
class AuthenticateUseCase {
    constructor() {}

    async execute({
        email,
        password,
    }: DTOAuthenticateUseCase.Input): Promise<DTOAuthenticateUseCase.Output> {
        SaveLogs.UseCaseTitle('AuthenticateUseCase (execute)');

        const foundUser = await prisma.user.findFirst({
            where: {
                email,
                deletedAt: null,
            },
            select: {
                id: true,
                name: true,
                password: true,
                deactivatedAt: true,
                role: {
                    select: { name: true },
                },
            },
        });

        if (!foundUser) {
            throw forbidden({
                error_code: 'InvalidCredentials',
                error_msgs: {
                    InvalidCredentials: 'Invalid email or password',
                },
            });
        }

        if (foundUser.deactivatedAt) {
            throw forbidden({
                error_code: 'UserDeactivated',
                error_msgs: {
                    UserDeactivated: 'This account has been deactivated',
                },
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            foundUser.password,
        );

        if (!passwordMatch) {
            throw forbidden({
                error_code: 'InvalidCredentials',
                error_msgs: {
                    InvalidCredentials: 'Invalid email or password',
                },
            });
        }

        const userData = {
            userId: foundUser.id,
            roleName: foundUser.role?.name ?? '',
        };

        const expiresInAccessToken = ONE_HOUR_IN_SECONDS;
        const expiresInRefreshToken = ONE_DAY_IN_SECONDS;

        const accessToken = jwt.sign(
            userData,
            process.env.JWT_SECRET as string,
            { expiresIn: expiresInAccessToken },
        );

        const refreshToken = jwt.sign(
            userData,
            process.env.JWT_SECRET as string,
            { expiresIn: expiresInRefreshToken },
        );

        if (accessToken && refreshToken) {
            await prisma.$transaction([
                prisma.refreshToken.deleteMany({
                    where: {
                        userId: foundUser.id,
                    },
                }),
                prisma.refreshToken.create({
                    data: {
                        token: refreshToken,
                        userId: foundUser.id,
                        expiresAt: new Date(
                            Date.now() + expiresInRefreshToken * 1000,
                        ),
                    },
                }),
            ]);
        }

        return {
            accessToken,
            refreshToken,
        };
    }
}

export { AuthenticateUseCase };
