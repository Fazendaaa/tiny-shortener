#!/usr/bin/env typescript

/**
 * Wrapper lib.
 */
'use strict';

import { get } from 'https';
import { IncomingMessage } from 'http';
import {
    parseResponse,
    verifyAlias,
    verifyURL
} from './utils';

/**
 * Function that does all the heavy work for wrapper.
 * 
 * The  request  and api parameters might not make sense at all, but they are needed in testing, to simulate cases where
 * the code might not work.
 */
export const getAPI = (request: Function, api: string, url: string, alias?: string): Promise<string> =>
new Promise((resolve: (shortened: string) => void, reject: (error: Error) => void) => {
    const parameters: string = `${verifyURL(url)}${verifyAlias(alias)}`;
    
    request(`${api}${encodeURI(parameters)}`, (res: IncomingMessage) => {
        let rawData: string;
        
        /**
         * In case that the API response was an error one.
         */
        if (200 !== res.statusCode) {
            reject(new Error('Request was not accepted.'));
        }

        /**
         * Since the HTML body comes by little packages, there's a need of joining them.
         */
        res.setEncoding('utf8');
        res.on('data', (chunk: string) => {
            rawData += chunk;
        });

        /**
         * Once the request is over, return the shortened link.
         */
        res.on('end', () => {
            resolve(parseResponse(rawData));
        });
    }).on('error', (error: Error) => {
        reject(error);
    });
});

/**
 * This function takes a API URL and a URL then returns the shortened version of the second one.
 */
export const wrapper = (api: string, url: string, alias?: string): Promise<string> =>
new Promise((resolve: (shortened: string) => void, reject: (error: Error) => void) => {
    /**
     * Unfortunately,  there  are many types of allowed URL strings, and checking all of them would mean always updating
     * this  code  when  a  new pattern would mean an unnecessary project overhead. It's only checked whether or not the
     * string empty.
     */
    if ('string' !== typeof(url)) {
        reject(new TypeError(`Wrong parameter type: ${typeof(url)}. String was expected.`));
    }
    /**
     * In  case  that  the  user sends a alias, it must be a string. If doesn't, the first comparison won't work at all,
     * skipping this case.
     */
    if (undefined !== typeof (url) && 'string' !== typeof (url)) {
        reject(new TypeError(`Wrong parameter type: ${typeof (url)}. String was expected.`));
    } else if ('' === alias) {
        reject(new Error('Empty alias parameter is not allowed.'));
       
    } else if ('' === url) {
        reject(new Error('Empty link parameter is not allowed.'));
    }
    return getAPI(get, api, url, alias).then(resolve).catch(reject);
});

export default wrapper;
