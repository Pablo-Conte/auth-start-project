export function ConvertToJson(
    variable: string | number | object | boolean | null | undefined | unknown,
): string {
    return JSON.stringify(variable, null, 2);
}
