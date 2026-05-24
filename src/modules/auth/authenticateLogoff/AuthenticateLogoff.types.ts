export namespace DTOAuthenticateLogoffController {
    export interface Output {}
}

export namespace DTOAuthenticateLogoffUseCase {
    export interface Input {
        refreshToken: string;
    }

    export interface Output {
        success: boolean;
    }
}
