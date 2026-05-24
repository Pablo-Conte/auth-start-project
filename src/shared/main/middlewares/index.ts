export * from './get-request-ip';
export * from './express-router';
export * from './validate-upload';
export * from './validate-auth';
export * from './validate-role';

import { TErrorMsg } from '@/shared/application/errors_msgs';

const middlewareErrorMessages = {
    ACCESS_DENIED: 'You do not have permission to access this resource',
    INVALID_TOKEN: 'Invalid token provided',
    TOKEN_NOT_FOUND: 'No token provided',
    UPLOAD_FILE_FAILED: 'Upload file failed',
    UPLOAD_FILE_NOT_FOUND: 'File not found',
    UPLOAD_FILE_INVALID_TYPE: 'Invalid file type',
    UPLOAD_FILE_INVALID_SIZE: 'Invalid file size',
    UPLOAD_FILE_INVALID_FORMAT: 'Invalid file format',
    UPLOAD_FILE_INVALID_NAME: 'Invalid file name',
} satisfies TErrorMsg;

export { middlewareErrorMessages };
