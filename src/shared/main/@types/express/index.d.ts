declare namespace Express {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface Request {
        user: {
            id?: string & {
                __uuidBrand: never;
            };
            ip?: string;
            grants?: string[];
            groups?: string[];
        };
        files: Express.Multer.File[];
    }
}
