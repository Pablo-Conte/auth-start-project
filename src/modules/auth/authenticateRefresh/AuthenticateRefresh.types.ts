export namespace DTOAuthenticateRefreshController {
    export interface Output {
        accessToken: string;
        refreshToken: string;
    }
}

export namespace DTOAuthenticateRefreshUseCase {
    export interface Input {
        refreshToken: string;
    }

    export interface Output {
        accessToken: string;
        refreshToken: string;
    }
}
