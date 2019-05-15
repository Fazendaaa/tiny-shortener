import { wrapper } from './lib/wrapper';

const api = 'https://tinyurl.com/create.php?source=indexpage';

/**
 * Request a URL to be shortened through tinyurl, with the support to alias in this new URL
 *
 * @param url What URL you want to be shortened
 * @param alias Wanted value to be used as alias
 *
 * @example
 * tiny('https://www.typescriptlang.org/').then(console.log).catch(console.error);
 * @example
 * tiny('https://www.typescriptlang.org/', 'typescript-lang').then(console.log).catch(console.error);
 *
 * @returns A promise containing the new URL
 */
export const tiny = async (url: string, alias?: string): Promise<string> => wrapper({ api, url, alias });
