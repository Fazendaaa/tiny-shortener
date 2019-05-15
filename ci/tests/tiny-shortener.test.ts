import { readFileSync } from 'fs';
import { join } from 'path';
import { tiny } from 'tiny-shortener';

let links: object;

jest.setTimeout(10000);

beforeAll(async () => {
    const basePath = join(__dirname, '../mocks/links.json');
    links = await JSON.parse(readFileSync(basePath, { encoding: 'UTF8' }));
});

describe('Running test to tiny function.', () => {
    const typeError = new TypeError('Wrong parameter type: undefined. String was expected.');
    const linkError = new Error('Empty link parameter is not allowed.');
    const aliasError = new Error('Empty alias parameter is not allowed.');

    test('Shortening undefined.', async () => expect(tiny(undefined)).rejects.toEqual(typeError));

    test('Shortening nothing.', async () => expect(tiny('')).rejects.toEqual(linkError));

    test('Shortening a non URL.', async () => expect(tiny(links.nonUrl.input)).resolves.toEqual(links.nonUrl.output));

    test('Shortening without HTTPS and WWWW.', async () => expect(tiny(links.without.both.input)).resolves.toEqual(links.without.both.output));

    test('Shortening without HTTP.', async () => expect(tiny(links.without.http.input)).resolves.toEqual(links.without.http.output));

    test('Shortening without HTTPS.', async () => expect(tiny(links.without.https.input)).resolves.toEqual(links.without.https.output));

    test('Shortening without www.', async () => expect(tiny(links.without.www.input)).resolves.toEqual(links.without.www.output));

    test('Shortening TypeScript website.', async () => expect(tiny(links.TypeScript.input)).resolves.toEqual(links.TypeScript.output));

    test('Shortening TypeScript website with an empty alias.', async () => expect(tiny(links.withAlias.input, '')).rejects.toEqual(aliasError));

    test('Shortening TypeScript website with alias support.', async () => expect(tiny(links.withAlias.input, links.withAlias.alias)).resolves.toEqual(links.withAlias.output));
});
