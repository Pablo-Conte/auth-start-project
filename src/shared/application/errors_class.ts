import { JsonErrorResponse } from './errors_msgs';

export class UnauthorizedError extends Error {
    constructor() {
        super('Unauthorized');
        this.name = 'UnauthorizedError';
    }
}

export class ForbiddenError extends Error {
    constructor() {
        super('Access denied');
        this.name = 'ForbiddenError';
    }
}

interface TAppError<T> {
    error_msgs: T;
    error_code: keyof T;
    detailed?: unknown;
}

export class AppError<T> extends Error {
    public readonly error: string;
    public override readonly message: any;
    public readonly detailed: unknown;

    constructor({ error_code, error_msgs, detailed }: TAppError<T>) {
        super('App Error');
        const error = error_msgs[error_code];
        const errorCode = error_code as string;

        this.error = errorCode;
        this.message = error; // serializa objetos/arrays para string
        this.detailed = detailed;
    }
}

interface TInputValidationError {
    detailed?: unknown;
    message?: string;
    statusCode?: number;
}
export class InputValidationError extends Error {
    public override readonly message: string;
    public readonly error: string;
    public readonly detailed: unknown;
    public readonly statusCode: number;

    constructor({
        message,
        detailed,
        statusCode = 422,
    }: TInputValidationError) {
        super('Input Validation Error');
        this.error = 'Input Validation Error';
        this.message = message as string;
        this.detailed = detailed;
        this.statusCode = statusCode;
    }
}

interface TMulterError {
    message: string;
    expected: string[];
    statusCode?: number;
}

export class MulterError extends Error {
    public override readonly name: string;
    public override readonly message: string;
    public readonly statusCode: number;

    constructor({ message, expected, statusCode = 400 }: TMulterError) {
        super('Multer Error');
        this.name = 'MulterError';
        this.message = { error: `${message}`, expected } as unknown as string;
        this.statusCode = statusCode;
    }
}
