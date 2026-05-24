/**
 * This function is responsible for dividing the refresh token into its components.
 */
export function RefreshTokenDivider(refreshToken: string): string {
    const token = refreshToken.split(' ')[1];

    return token;
}
