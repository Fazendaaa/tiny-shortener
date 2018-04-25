#!/usr/bin/env typescript

/**
 * Tiny lib.
 *
 * The  JSDoc  notation  is  used here to allow the npm package to have only the needed files to work, because when this
 * file run trough the TypeScript(TS) compiler will generate JavaScript(JS) ones with this JSDoc notation.
 * The  npm  package  will  have  only the JS and the TS typing files, not the TS files itself. That is because TS files
 * won't  be  needed  to  the  package  works  even  in  a  TS  development  environment, because they will be stored in
 * node_modules folder.
 */
'use strict';

import { wrapper } from './lib/wrapper';

/**
 * This function takes a URL to be shortened through Tiny URL.
 * 
 * @async
 * @function tiny
 * @example
 * tiny('https://www.typescriptlang.org/').then(console.log)
 * // 'http://tinyurl.com/j6laat4'
 * @example
 * tiny('https://www.typescriptlang.org/', 'typescript').then(console.log)
 * // 'http://tinyurl.com/typescript'
 * @param {string} url link to be shortened.
 * @param {string} alias personalized name for URL.
 * @throws {Error | TypeError} Rejects in case of connections errors.
 * @returns {Promise<string>} Link shortened.
 */
export const tiny = (url: string, alias?: string): Promise<string> => wrapper('https://tinyurl.com/create.php?source=indexpage', url, alias);

/**
 * For those in JavaScript that still don't use the default import model.
 */
export default tiny;
