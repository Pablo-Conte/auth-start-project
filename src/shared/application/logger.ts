import pino from 'pino';
import pretty from 'pino-pretty';

// Define o formato de logs
const stream = pretty({
    colorize: true,
    translateTime: true,
    ignore: 'pid,hostname,level,time,name,caller',
    // messageFormat: "[{time}]{msg}",
});

// Cria um logger com as opções especificadas
export const logger = pino(
    {
        level: 'info',
    },
    stream,
);
