import jwt from 'jsonwebtoken';
import { unauthorized } from '@/shared/application';
import { TokenPayload, TokenPayloadSchema } from './token_schema';

export const decodeToken = (authHeader?: string): TokenPayload => {
    if (!authHeader) {
        throw unauthorized({
            error_code: 'MissingToken',
            error_msgs: { MissingToken: 'Authorization header is missing' },
        });
    }

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
        throw unauthorized({
            error_code: 'InvalidTokenFormat',
            error_msgs: { InvalidTokenFormat: 'Token format is invalid' },
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const payload = TokenPayloadSchema.parse(decoded);
        return payload;
    } catch (error) {
        throw unauthorized({
            error_code: 'InvalidToken',
            error_msgs: { InvalidToken: 'Token is invalid or expired' },
        });
    }
};
