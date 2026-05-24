/**
 * Remove acentos, caracteres especiais, espaços em branco e converte para minúsculo
 * @param string A string a ser normalizada
 * @returns A string normalizada
 */
export function NormalizeStrings(string: string): string {
    return string
        ?.normalize('NFD')
        ?.replace(/[\u0300-\u036f]/g, '')
        ?.toLowerCase();
}
