import { prisma } from '../prisma-client';

const ADMIN_BACKOFFICE_ROLE_ID = '435d5575-8092-4f3a-b398-2bc3041a0d8f';

const runRolesSeed = async () => {
    await prisma.role.upsert({
        where: { id: ADMIN_BACKOFFICE_ROLE_ID },
        update: {},
        create: {
            id: ADMIN_BACKOFFICE_ROLE_ID,
            name: 'admin_backoffice',
        },
    });
};

runRolesSeed()
    // eslint-disable-next-line no-console
    .catch(console.error)
    .finally(() => prisma.$disconnect());
