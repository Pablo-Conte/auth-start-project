import { logger } from '@/shared/application/logger';
import { PrismaPg } from '@prisma/adapter-pg';
import pkg from '@prisma/client';

const { PrismaClient } = pkg;

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

export const prisma = new PrismaClient({
    adapter,
    errorFormat: 'pretty',
    log: [{ emit: 'event', level: 'error' }],
});

prisma.$on('error', () => {
    logger.error('Prisma Client Error');
});
