#!/usr/bin/env typescript

'use strict';

import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { IncomingMessage } from 'http';
import { get } from 'https';
import { join } from 'path';
import { tiny } from '../src/tiny-shortener';
import { getAPI, wrapper } from '../src/lib/wrapper';


config();

let links;

jest.setTimeout(10000);

beforeAll(async done => {
    const basePath = join(__dirname, '../__mocks__/links.json');
    links = await JSON.parse(readFileSync(basePath, { encoding: 'UTF8' }));

    done();
});

describe('Running test to tiny function.', () => {
    const typeError = new TypeError('Wrong parameter type: undefined. String was expected.');
    const linkError = new Error('Empty link parameter is not allowed.');
    const aliasError = new Error('Empty alias parameter is not allowed.');

    test('Non connection scenario.', async () => {
        expect.assertions(1);

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
    
    test('Shortening TypeScript website with alias support.', async done => {
        expect.assertions(1);
        
        await expect(tiny(links.withAlias.input, links.withAlias.alias)).resolves.toEqual(links.withAlias.output);
        done();
    });
});
