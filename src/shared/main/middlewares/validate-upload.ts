/* eslint-disable no-case-declarations */
import crypto from 'crypto';
import encodeUrl from 'encodeurl';
import multer from 'multer';
import path, { resolve } from 'node:path';

import {
    InputValidationError,
    MulterError,
    unprocessableEntity,
} from '@/shared/application';
import { SaveLogs } from '@/shared/application/save_logs';
import { NormalizeStrings } from '@/utils/NormalizeStrings';

interface RouteRules {
    body: Record<string, any>;
}

const tmpFolder = resolve('./tmp');

export function validateUpload(validationRules: RouteRules) {
    SaveLogs.MiddlewareTitle('validateUpload');

    if (!validationRules)
        throw new InputValidationError({
            message: 'Validation rules not found',
        });
    try {
        return multer({
            storage: multer.diskStorage({
                destination: tmpFolder,
                filename: (_request, file, callback) => {
                    const fileHash = crypto.randomBytes(16).toString('hex');
                    const normalizedFileName = NormalizeStrings(
                        file.originalname,
                    ).replace(/ /g, '_');
                    const encodedFileName = encodeUrl(normalizedFileName);
                    const fileName = `${fileHash}-${encodedFileName}`;

                    return callback(null, fileName);
                },
            }),
            fileFilter(_request, file, callback) {
                const fileFieldname = file.fieldname;
                const fileExtension = path.extname(file.originalname);
                const bodyRules = Object.keys(validationRules.body);

                switch (fileFieldname) {
                    case 'logo':
                    case 'avatar':
                        const allowedImgExtensions = [
                            '.jpeg',
                            '.pjpeg',
                            '.png',
                            '.gif',
                            '.jpg',
                        ];
                        const fileExtensionsIsValid =
                            allowedImgExtensions.includes(fileExtension);
                        if (!fileExtensionsIsValid)
                            callback(
                                new MulterError({
                                    message: 'Unexpected file type',
                                    expected: allowedImgExtensions,
                                }),
                            );
                        break;
                    case 'invite_csv':
                    case 'excel':
                        const allowedExcelExtensions = [
                            '.csv',
                            '.xls',
                            '.xlsx',
                            '.xlsm',
                            '.xlsb',
                            '.xltx',
                            '.xltm',
                            '.xlt',
                            '.xml',
                            '.xlam',
                        ];
                        const fileExtensionIsValid =
                            allowedExcelExtensions.includes(fileExtension);
                        if (!fileExtensionIsValid)
                            callback(
                                new MulterError({
                                    message: 'Unexpected file extension',
                                    expected: allowedExcelExtensions,
                                }),
                            );
                        break;
                    case 'invoices':
                    case 'billets':
                    case 'report':
                    case 'pdf':
                        const allowedPDFExtensions = ['.pdf'];
                        const fileExtensionIsValidPDF =
                            allowedPDFExtensions.includes(fileExtension);
                        if (!fileExtensionIsValidPDF)
                            callback(
                                new MulterError({
                                    message: 'Unexpected file type',
                                    expected: allowedPDFExtensions,
                                }),
                            );
                        break;
                    default:
                        break;
                }
                // verificar se nas regras do body existe algum arquivo com o nome de file
                const fileNameIsValid = bodyRules.includes(file.fieldname);
                if (!fileNameIsValid)
                    callback(
                        new MulterError({
                            message: 'Unexpected file',
                            expected: bodyRules,
                        }),
                    );
                callback(null, true);
            },
            limits: {
                fileSize: 5 * 1024 * 1024, // 5MB
                // fileSize: 50 * 1024 * 1024, // 50MB
                // fileSize: 100 * 1024 * 1024, // 100MB
            },
        }).any();
    } catch (error) {
        throw unprocessableEntity({ error });
    }
}
