/**
 * Tipagem para o tipo UUID
 *
 * @brand A propriedade __uuidBrand é uma marca que é definida como never, tornando-a exclusiva para o tipo UUID. Dessa forma, qualquer valor que tenha essa marca é considerado um UUID válido.
 */
export type UUID = string & {
    __uuidBrand: never;
};

/**
 * Tipagem para o tipo JWTToken
 *
 * @brand A propriedade __jwtTokenBrand é uma marca que é definida como unique symbol, tornando-a exclusiva para o tipo JWTToken. Dessa forma, qualquer string que tenha essa marca é considerado um JWTToken válido.
 */
export type JWTToken = string & {
    readonly __jwtTokenBrand: unique symbol;
};
