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
import { join } from 'path';
import { tiny } from '../src/tiny-shortener';
import { wrapper } from '../src/lib/wrapper';

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
    const error: Error = new Error('Empty string parameter is not allowed.');

    /**
     *******************************************************************************************************************
     **************************************************** ASYNC ********************************************************
     *******************************************************************************************************************
     */
    
    test('[ASYNC] Shortening undefined.', async () => {
        expect.assertions(1);
        
        await expect(tiny(undefined)).rejects.toEqual(typeError);
    });

    test('[ASYNC] Shortening nothing.', async () => {
        expect.assertions(1);

        await expect(tiny('')).rejects.toEqual(error);
    });

    /**
     * This test will emulate cases that the Tiny URL Api is down.
     */
    test('[ASYNC] Iº shortening of a parameter that breaks API.', async () => {
        expect.assertions(1);
        
        /**
         * It will throw a ERR_INVALID_DOMAIN_NAME that doesn't matter.
         */
        await expect(wrapper(process.env.MOCK_API, links.nonUrl.input)).rejects.toThrow();
    });

    test('[ASYNC] IIº shortening of a parameter that breaks API.', async () => {
        expect.assertions(1);

        await expect(wrapper(`${process.env.MOCK_API}/error/`, links.nonUrl.input)).rejects.toThrow();
    });

    test('[ASYNC] Shortening a non URL.', async () => {
        expect.assertions(1);

        await expect(tiny(links.nonUrl.input)).resolves.toEqual(links.nonUrl.output);
    });

    test('[ASYNC] Shortening TypeScript website.', async () => {
        expect.assertions(1);

        await expect(tiny(links.TypeScript.input)).resolves.toEqual(links.TypeScript.output);
    });

    test('[ASYNC] Shortening without HTTPS and WWWW.', async () => {
        expect.assertions(1);

        await expect(tiny(links.without.input)).resolves.toEqual(links.without.output);
    });

    /**
     *******************************************************************************************************************
     ************************************************** PROMISES *******************************************************
     *******************************************************************************************************************
     */

    test('[PROMISE] Shortening undefined.', () => {
        expect.assertions(1);

        return expect(tiny(undefined)).rejects.toThrow();
    });

    test('[PROMISE] Shortening nothing.', () => {
        expect.assertions(1);

        return expect(tiny('')).rejects.toThrow();
    });

    test('[PROMISE] Iº shortening of a parameter that breaks API.', () => {
        expect.assertions(1);

        return expect(wrapper(process.env.MOCK_API, links.nonUrl.input)).rejects.toThrow();
    });

    test('[PROMISE] IIº shortening of a parameter that breaks API.', () => {
        expect.assertions(1);

        return expect(wrapper(`${process.env.MOCK_API}/error/`, links.nonUrl.input)).rejects.toThrow();
    });

    test('[PROMISE] Shortening a non URL.', () => {
        expect.assertions(1);

        return expect(tiny(links.nonUrl.input)).resolves.toEqual(links.nonUrl.output);
    });

    test('[PROMISE] Shortening TypeScript website.', () => {
        expect.assertions(1);

        return expect(tiny(links.TypeScript.input)).resolves.toEqual(links.TypeScript.output);
    });

    test('[PROMISE] Shortening without HTTPS and WWWW.', () => {
        expect.assertions(1);

        return expect(tiny(links.without.input)).resolves.toEqual(links.without.output);
    });
});
