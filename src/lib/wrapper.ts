#!/usr/bin/env typescript

/**
 * Wrapper lib.
 */
'use strict';

import { get } from 'https';
import { IncomingMessage } from 'http';

/**
 * This function takes a API URL and a URL then returns the shortened version of the second one.
 * @param api URL to that calls the API shorten;
 * @param url link to be shorted.
 */
export const wrapper = (api: string, url: string): Promise<string> =>
new Promise((resolve: (shortened: string) => void, reject: (error: Error) => void) => {
    /**
     * Unfortunately,  there  are many types of allowed URL strings, and checking all of them would mean always updating
     * this  code  when  a  new pattern would mean an unnecessary project overhead. It's only checked whether or not the
     * string empty.
     */
    if (undefined !== url && 'string' === typeof(url)) {
        if ('' !== url) {
            get(`${api}${encodeURIComponent(url)}`, (res: IncomingMessage) => {
                const { statusCode } = res;

                /**
                 * In case that the API response was an error one.
                 */
                if (200 !== statusCode) {
                    reject(new Error('Request was not accepted.'));
                } else {
                    res.on('data', (chunk: string | Buffer) => {
                        resolve(chunk.toString());
                    });
                }                
            }).on('error', (error: Error) => {
                reject(error);
            });
        } else {
            reject(new Error('Empty string parameter is not allowed.'));
        }
    } else {
        reject(new TypeError(`Wrong parameter type: ${typeof(url)}. String was expected.`));
    }
});

/**
 * For those in JavaScript that still don't use the default import model.
 */
export default wrapper;
