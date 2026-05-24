/* eslint-disable @typescript-eslint/no-explicit-any */

import { AppError } from './errors_class';

export interface HttpResponse<T = any> {
    statusCode: number;
    data: T;
    headers?: Record<string, string>;
    isBinary?: boolean;
}

type ErrorOrMessages<T> =
    | { error: Error; error_msgs?: never; error_code?: never; detailed?: never }
    | { error_msgs: T; error_code: keyof T; error?: never; detailed?: unknown };

/**
 * @description Resposta de status **200** indicada para leitura de um recurso.
 * Esta função foi extendida para manipular respostas com dados binários e cabeçalhos personalizados.
 *
 * @param data Dados que serão retornados na resposta. Pode ser um buffer binário ou qualquer outro tipo de dado.
 * @param headers (Opcional) Cabeçalhos adicionais para a resposta HTTP. Útil para configurações como 'Content-Type' e 'Content-Disposition'.
 * @param isBinary (Opcional) Indica se a resposta contém dados binários. Se verdadeiro, a resposta será enviada como um fluxo binário.
 *
 * @returns Retorna um objeto de resposta com o status 200. O objeto pode conter dados binários e cabeçalhos específicos dependendo dos parâmetros fornecidos.
 */
export const ok = <T = any>(
    data: T,
    headers?: Record<string, string>,
    isBinary: boolean = false,
): HttpResponse<T> => ({
    statusCode: 200,
    data,
    headers,
    isBinary,
});

/**
 * @description Resposta de status **201** indicada para quando um recurso é criado
 * @param data Dados que serão retornados na resposta
 * @returns Retorna um objeto de resposta com o status 201
 */
export const created = <T = any>(data: T): HttpResponse<T> => ({
    statusCode: 201,
    data: data,
});

/**
 * @description Resposta de status **204** indicada para quando um recurso é deletado ou ao subir arquivos
 * @operational Essa função é utilizada para retornar uma resposta sem conteúdo
 * @returns Retorna um objeto de resposta com o status 204
 */
export const noContent = (): HttpResponse => ({
    statusCode: 204,
    data: undefined,
});

/**
 * @description Resposta de status **400** indicada para quando ocorre algum erro de validação na requisição
 * @operational Esse método recebe um erro e retorna um objeto de resposta com o status 400
 * @param error_code Código do erro que ocorreu na validação da requisição
 * @param error_msgs Mensagens de erro que disponíveis para a rota
 * @returns Retorna um objeto de resposta com o status 400
 */
export const badRequest = <T = any>({
    error_code,
    error_msgs,
    error,
}: ErrorOrMessages<T>): HttpResponse<Error | AppError<T>> => ({
    statusCode: 400,
    data: error ? error : new AppError({ error_msgs, error_code }),
});

/**
 * @description Resposta de status **401** indicada para quando ocorre algum erro de autenticação na requisição
 * @returns Retorna um objeto de resposta com o status 401
 */
export const unauthorized = <T = any>({
    error_code,
    error_msgs,
    detailed,
    error,
}: ErrorOrMessages<T>): HttpResponse<Error | AppError<T>> => ({
    statusCode: 401,
    data: error ? error : new AppError({ error_msgs, error_code, detailed }),
});

/**
 * @description Resposta de status **403** indicada para quando ocorre algum erro de permissão na requisição
 * @returns Retorna um objeto de resposta com o status 403
 */
export const forbidden = <T = any>({
    error_code,
    error_msgs,
    error,
}: ErrorOrMessages<T>): HttpResponse<Error | AppError<T>> => ({
    statusCode: 403,
    data: error ? error : new AppError({ error_msgs, error_code }),
});

/**
 * @description Resposta de status **404** indicada para quando um recurso não é encontrado
 * @operational Esse método recebe um erro e retorna um objeto de resposta com o status 404
 * @param error_code Código do erro que ocorreu na validação da requisição
 * @param error_msgs Mensagens de erro que disponíveis para a rota
 * @returns Retorna um objeto de resposta com o status 404
 */
export const notFound = <T = any>({
    error_code,
    error_msgs,
    error,
}: ErrorOrMessages<T>): HttpResponse<Error | AppError<T>> => ({
    statusCode: 404,
    data: error ? error : new AppError({ error_msgs, error_code }),
});

/**
 * @description Resposta de status **409** indicada para quando ocorre algum erro de conflito na requisição
 * @operational Esse método recebe um erro e retorna um objeto de resposta com o status 409
 * @param error_code Código do erro que ocorreu na validação da requisição
 * @param error_msgs Mensagens de erro que disponíveis para a rota
 * @returns Retorna um objeto de resposta com o status 409
 */
export const conflict = <T = any>({
    error_code,
    error_msgs,
    error,
}: ErrorOrMessages<T>): HttpResponse<Error | AppError<T>> => ({
    statusCode: 409,
    data: error ? error : new AppError({ error_msgs, error_code }),
});

/**
 * @description Resposta de status **422** indicada para quando ocorre algum erro de validação na requisição
 * @operational Esse método recebe um erro e retorna um objeto de resposta com o status 422
 * @param error_code Código do erro que ocorreu na validação da requisição
 * @param error_msgs Mensagens de erro que disponíveis para a rota
 * @param error Erro que ocorreu na validação da requisição
 * @returns Retorna um objeto de resposta com o status 422
 */
export const unprocessableEntity = <T>({
    error_code,
    error_msgs,
    error,
}: ErrorOrMessages<T>): HttpResponse<Error | AppError<T>> => ({
    statusCode: 422,
    data: error ? error : new AppError({ error_msgs, error_code }),
});

/**
 * @description Resposta de status **500** indicada para quando ocorre algum erro interno na requisição
 * @operational Esse método recebe um erro e retorna um objeto de resposta com o status 500
 * @param error_code Código do erro que ocorreu na validação da requisição
 * @param error_msgs Mensagens de erro que disponíveis para a rota
 * @param error Erro que ocorreu na validação da requisição
 * @returns Retorna um objeto de resposta com o status 500
 */
export const serverError = <T>({
    error_code,
    error_msgs,
    error,
}: ErrorOrMessages<T>): HttpResponse<Error | AppError<T>> => ({
    statusCode: 500,
    data: error ? error : new AppError({ error_msgs, error_code }),
});
