import dayjs from 'dayjs';
import { Request } from 'express';

import { ConvertToJson } from '@/utils/ConvertToJson';

import { lightGreen, lightRed, lightYellow, white } from './ansi_colors';
import { logger } from './logger';

/**
 * @description Retorna a data atual no formato hh:mm:ss.ms
 * @operational
 *  - Utiliza a biblioteca DayJs para formatar a data
 *  - Necessita que o timezone correto já esteja configurado no ambiente
 * @example 12:34:56.789
 * @returns Data atual no formato ISO 8601, já com o fuso horário
 */
function DateNow(): string {
    return dayjs().format('HH:mm:ss.ms');
}

class SaveLogs {
    static ProviderSuccess(name: string) {
        logger.info(lightGreen, `[${DateNow()}][controller] ${name}`);
    }
    static ControllerTitle(name: string) {
        logger.info(lightYellow, `[${DateNow()}][controller] ${name}`);
    }

    static UseCaseTitle(name: string) {
        logger.info(lightYellow, `[${DateNow()}][use_case] ${name}`);
    }

    static RepositoryTitle(name: string) {
        logger.info(lightYellow, `[${DateNow()}][repository] ${name}`);
    }

    static ProviderTitle(name: string) {
        logger.info(lightYellow, `[${DateNow()}][provider] ${name}`);
    }

    static ExpressInput(request: Request) {
        logger.info(
            lightYellow,
            `[${DateNow()}][express] Request: ${request.method} ${
                request.baseUrl
            } ${request.url}`,
        );
    }

    static ExpressOutput(status: number) {
        logger.info(
            lightGreen,
            `[${DateNow()}][express] Response: status code ${status}`,
        );
        logger.info(
            white,
            '\n--------------------------------------------------\n',
        );
    }

    static ErrorHandler(status: number, message: unknown) {
        logger.error(
            lightRed,
            `[${DateNow()}][express] Error: status code ${status}`,
        );
        logger.error(
            lightRed,
            `[${DateNow()}][express] Error: ${ConvertToJson(message)}`,
        );
        logger.error(
            white,
            '\n--------------------------------------------------\n',
        );
    }

    static MiddlewareTitle(name: string) {
        logger.info(lightYellow, `[${DateNow()}][middleware] ${name}`);
    }
}

export { SaveLogs };
