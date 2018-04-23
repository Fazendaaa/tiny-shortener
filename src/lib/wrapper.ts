#!/usr/bin/env typescript

/**
 * Wrapper lib.
 */
'use strict';

import { get } from 'https';
import { IncomingMessage } from 'http';

/**
 * Since Tiny URL works only with URL links that have WWW attached to it, this function does this checking.
 */
const verifyURL = (url: string): string => {
    return url.includes('www.') ? url : 'www.'.concat(url);
};

/**
 * Function that does all the heavy work for wrapper.
 */
const getAPI = (api: string, url: string): Promise<string> =>
new Promise((resolve: (shortened: string) => void, reject: (error: Error) => void) => {
    get(`${api}${encodeURIComponent(verifyURL(url))}`, (res: IncomingMessage) => {
        const { statusCode } = res;

        /**
         * In case that the API response was an error one.
         */
        if (200 !== statusCode) {
            reject(new Error('Request was not accepted.'));
        }
        res.on('data', (chunk: string | Buffer) => {
            resolve(chunk.toString());
        });
    }).on('error', (error: Error) => {
        reject(error);
    });
});

/**
 * This function takes a API URL and a URL then returns the shortened version of the second one.
 * @param api URL to that calls the API shortener;
 * @param url link to be shortened.
 */
export const wrapper = (api: string, url: string): Promise<string> =>
new Promise((resolve: (shortened: string) => void, reject: (error: Error) => void) => {
    /**
     * Unfortunately,  there  are many types of allowed URL strings, and checking all of them would mean always updating
     * this  code  when  a  new pattern would mean an unnecessary project overhead. It's only checked whether or not the
     * string empty.
     */
    if ('string' !== typeof(url)) {
        reject(new TypeError(`Wrong parameter type: ${typeof(url)}. String was expected.`));
    } else if ('' === url) {
        reject(new Error('Empty string parameter is not allowed.'));
    }
    return getAPI(api, url).then(resolve).catch(reject);
});

/**
 * For those in JavaScript that still don't use the default import model.
 */
export default wrapper;
