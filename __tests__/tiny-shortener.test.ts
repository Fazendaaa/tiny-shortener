#!/usr/bin/env typescript

/**
 * Main test program.
 */
'use strict';

/**
 * The non-relative import doesn't works here because __tests__ folder is exclude from compilation options just so, that
 * way, doesn't runs here and then creates a JavaScript test files.
 */
import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { IncomingMessage } from 'http';
import { get } from 'https';
import { join } from 'path';
import { tiny } from '../src/tiny-shortener';
import {
    getAPI,
    wrapper
} from '../src/lib/wrapper';

/**
 * Just allowing it to read environment variables.
 */
config();

/**
 * Not setting a object type because the TypeScript compile would be more strict about this.
 */
let links;

/**
 * Set ten seconds as time out test runner.
 */
jest.setTimeout(10000);

/**
 * Reading mock files with async/await option to make it easy to mock tests during running.
 */
beforeAll(async () => {
    links = await JSON.parse(readFileSync(join(__dirname, '../__mocks__/links.json'), { encoding: 'UTF8' }));
});

/**
 * Main tests. Just a reminder that shortening a non URL works because the Tiny URL API allows it.
 */
describe('Running test to tiny function.', () => {
    const typeError: TypeError = new TypeError('Wrong parameter type: undefined. String was expected.');
    const linkError: Error = new Error('Empty link parameter is not allowed.');
    const aliasError: Error = new Error('Empty alias parameter is not allowed.');

    test('Non connection scenario.', async () => {
        expect.assertions(1);

        /**
         * Technically  speaking  this  function must return a ClientRequest from http package, but since this is only a
         * mock there's no need, in this case, in diving so deep into it.
         */
        const mockGet = (request: string, callback: (res: IncomingMessage) => void) => {
            return {
                on: (type: string, callback: (response) => void) => {
                    if ('error' ===  type) {
                        callback(new Error('No connection.'));
                    }
                }
            };
        };
        
        await expect(getAPI(mockGet, process.env.MOCK_API, links.nonUrl.input)).rejects.toThrow();
    });

    test('API down scenario.', async () => {
        expect.assertions(1);
        
        /**
         * It will throw a ERR_INVALID_DOMAIN_NAME that doesn't matter.
         */
        await expect(wrapper(process.env.MOCK_API, links.nonUrl.input)).rejects.toThrow();
    });

    test('Shortening undefined.', async () => {
        expect.assertions(1);

        await expect(tiny(undefined)).rejects.toEqual(typeError);
    });

    test('Shortening nothing.', async () => {
        expect.assertions(1);

        await expect(tiny('')).rejects.toEqual(linkError);
    });

    test('Shortening a non URL.', async () => {
        expect.assertions(1);

        await expect(tiny(links.nonUrl.input)).resolves.toEqual(links.nonUrl.output);
    });

    test('Shortening without HTTPS and WWWW.', async () => {
        expect.assertions(1);

        await expect(tiny(links.without.both.input)).resolves.toEqual(links.without.both.output);
    });

    /**
     * This one is my portfolio and, unfortunately, the web site that made it still doesn't allow https.
     */
    test('Shortening without HTTP.', async () => {
        expect.assertions(1);

        await expect(tiny(links.without.http.input)).resolves.toEqual(links.without.http.output);
    });

    test('Shortening without HTTPS.', async () => {
        expect.assertions(1);

        await expect(tiny(links.without.https.input)).resolves.toEqual(links.without.https.output);
    });

    test('Shortening without www.', async () => {
        expect.assertions(1);

        await expect(tiny(links.without.www.input)).resolves.toEqual(links.without.www.output);
    });

    test('Shortening TypeScript website.', async () => {
        expect.assertions(1);

        await expect(tiny(links.TypeScript.input)).resolves.toEqual(links.TypeScript.output);
    });

    test('Shortening TypeScript website with an empty alias.', async () => {
        expect.assertions(1);

        await expect(tiny(links.withAlias.input, '')).rejects.toEqual(aliasError);
    });
    
    test('Shortening TypeScript website with alias support.', async () => {
        expect.assertions(1);
        
        await expect(tiny(links.withAlias.input, links.withAlias.alias)).resolves.toEqual(links.withAlias.output);
    });
});
