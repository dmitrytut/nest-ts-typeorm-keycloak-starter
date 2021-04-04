/**
 * Приминает строку и возвращает первый символ.
 */
export function getFirstCharacter(name: string): string {
    return Boolean(name) ? name.charAt(0).toUpperCase() : '';
}
