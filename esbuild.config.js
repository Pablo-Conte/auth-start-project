import esbuild from 'esbuild';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import pino from 'pino';
import pretty from 'pino-pretty';

import packageJson from './package.json' with { type: 'json' };

// Define o formato de logs
const stream = pretty({
    colorize: true,
    translateTime: true,
    ignore: 'pid,hostname,level,time,name,caller',
});

// Cria um logger com as opções especificadas
const logger = pino(
    {
        level: 'info',
    },
    stream,
);

const { dependencies, devDependencies } = packageJson;

const collectEntryPoints = (dir) => {
    const entries = readdirSync(dir, { withFileTypes: true });

    return entries.flatMap((entry) => {
        const fullPath = join(dir, entry.name);

        if (entry.isDirectory()) {
            return collectEntryPoints(fullPath);
        }

        if (/\.(ts|js)$/.test(entry.name)) {
            return [fullPath];
        }

        return [];
    });
};

const entryPoints = collectEntryPoints('./src');

esbuild
    .build({
        entryPoints,
        allowOverwrite: true,
        minify: true,
        sourcemap: true,
        outdir: 'dist',
        platform: 'node',
        logLevel: 'silent',
        external: Object.keys(dependencies).concat(Object.keys(devDependencies)),
        target: ['node22.22.1'],
        bundle: true,
        resolveExtensions: ['.ts', '.js', '.json'],
        format: 'esm',
    })
    .then(() => {
        logger.info(
            '\x1b[92m%s\x1b[0m',
            `[esbuild] successfully compiled ${entryPoints.length} files!\n`,
        );
    })
    .catch((error) => {
        logger.info(
            '\x1b[91m%s\x1b[0m',
            `[esbuild] error compiling ${entryPoints.length} files!\n`,
        );
        logger.error('\x1b[91m%s\x1b[0m', `[esbuild] ${error}\n`);
        process.exit(1);
    });
