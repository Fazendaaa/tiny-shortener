#!/usr/bin/env typescript

'use strict';

import { get } from 'https';
import { IncomingMessage } from 'http';
import { parseResponse, verifyAlias, verifyURL } from './utils';

export const getAPI = (request: Function, api: string, url: string, alias?: string): Promise<string> =>
new Promise((resolve: (shortened: string) => void, reject: (error: Error) => void) => {
    const parameters: string = `${verifyURL(url)}${verifyAlias(<string> alias)}`;
    
    request(`${api}${encodeURI(parameters)}`, (res: IncomingMessage) => {
        let rawData: string;
        
        if (200 !== res.statusCode) {
            reject(new Error('Request was not accepted.'));
        }

        res.setEncoding('utf8');
        res.on('data', (chunk: string) => {
            rawData += chunk;
        });

        res.on('end', () => {
            resolve(parseResponse(rawData));
        });
    }).on('error', (error: Error) => {
        reject(error);
    });
});

export const wrapper = (api: string, url: string, alias?: string): Promise<string> =>
new Promise((resolve: (shortened: string) => void, reject: (error: Error) => void) => {
    if ('string' !== typeof(url)) {
        reject(new TypeError(`Wrong parameter type: ${typeof(url)}. String was expected.`));
    } if (undefined !== typeof (url) && 'string' !== typeof (url)) {
        reject(new TypeError(`Wrong parameter type: ${typeof (url)}. String was expected.`));
    } if ('' === alias) {
        reject(new Error('Empty alias parameter is not allowed.'));       
    } if ('' === url) {
        reject(new Error('Empty link parameter is not allowed.'));
    }

    return getAPI(get, api, url, alias).then(resolve).catch(reject);
});

export default wrapper;
