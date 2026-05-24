export interface PermissionsSeed {
    [key: string]: Permission<string>;
}

interface Permission<T> {
    id: string;
    description: string;
    accessCode: T;
    active: boolean;
}

type Validate<PermsList extends PermissionsSeed> = {
    [Key in keyof PermsList]: Key extends PermsList[Key]['accessCode']
        ? PermsList[Key]
        : PermsList[Key] & { accessCode: never };
};

// Check de integridade para garantir que o access code tenha o mesmo valor da chave do objeto na lista de permissões
const integrityCheck = <
    Id extends string,
    AccessCode extends Permission<Id>,
    Data extends Record<Id, AccessCode>,
>(
    data: Validate<Data>,
) => data;

const account = integrityCheck({
    read_account: {
        id: '9bbf21bf-d63a-4983-9b6e-8983f15d5589',
        description: 'LER CONTA',
        accessCode: 'read_account',
        active: true,
    },
});

export const permsList = {
    ...account,
} satisfies PermissionsSeed;
