export namespace DTOAuthenticateController {
    export interface Output {
        accessToken: string;
        refreshToken: string;
    }
}

export namespace DTOAuthenticateUseCase {
    export interface Input {
        email: string;
        password: string;
    }

    export interface Output {
        accessToken: string;
        refreshToken: string;
    }
}
