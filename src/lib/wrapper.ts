import { IncomingMessage } from 'http';
import { get } from 'https';
import { parseAlias, parseResponse, parseURL } from 'parse';

interface HandleGet {
    readonly res: IncomingMessage;
    readonly reject: (error: Error) => void;
    readonly resolve: (shortened: string) => void;
}

interface Wrapper {
    readonly api: string;
    readonly url: string;
    readonly alias?: string;
}

/**
 * Handles the response from tinyurl
 *
 * @param res Incoming message from the server containing the HTML body
 * @param reject The function to be called when an error occurs
 * @param resolve The function to be called when the response ends
 * @returns Nothing
 */
const handleGet = ({ res, resolve, reject }: HandleGet): void => {
    let rawData = '';

    if (200 !== res.statusCode) {
        reject(new Error('Request was not accepted.'));
    }

    res.setEncoding('utf8')
       .on('error', reject)
       .on('uncaughtException', reject)
       .on('data', (chunk: string) => rawData += chunk)
       .on('end', () => resolve(parseResponse(rawData)));
};

/**
 * Handles the request to shorter a URL
 *
 * @param api The api URL end point
 * @param url The URL to be shortened
 * @param alias The provided alias to be used
 * @example
 * wrapper({ api: 'www.foo.com', url: 'bar.com' });
 * @example
 * wrapper({ api: 'www.foo.com', url: 'bar.com', alias: 'baz' });
 * @returns The URL shortened
 * @returns A promise containing the HTML page from tinyurl
 */
export const getAPI = async ({ api, url, alias }: Wrapper): Promise<string> => {
    return new Promise((resolve: (shortened: string) => void, reject: (error: Error) => void) => {
        const parameters = `${parseURL(url)}${parseAlias(<string> alias)}`;
        const curriedHandleGet = ((res: IncomingMessage) => handleGet({ res, resolve, reject }));

        get(`${api}${encodeURI(parameters)}`)
            .on('response', curriedHandleGet)
            .on('error', reject)
            .end();
    });
};

/**
 * Wraps up the request to shorter a URL
 *
 * @param api The api URL end point
 * @param url The URL to be shortened
 * @param alias The provided alias to be used
 * @example
 * wrapper({ api: 'www.foo.com', url: 'bar.com' });
 * @example
 * wrapper({ api: 'www.foo.com', url: 'bar.com', alias: 'baz' });
 * @returns The URL shortened
 */
export const wrapper = async ({ api, url, alias }: Wrapper): Promise<string> => {
    return new Promise((resolve: (shortened: string) => void, reject: (error: Error) => void) => {
        if ('string' !== typeof (url)) {
            reject(new TypeError(`Wrong parameter type: ${typeof (url)}. String was expected.`));
        } if (undefined !== typeof (url) && null !== typeof (url) && 'string' !== typeof (url)) {
            reject(new TypeError(`Wrong parameter type: ${typeof (url)}. String was expected.`));
        } if ('' === alias) {
            reject(new Error('Empty alias parameter is not allowed.'));
        } if ('' === url) {
            reject(new Error('Empty link parameter is not allowed.'));
        }

        getAPI({ api, url, alias }).then(resolve).catch(reject);
    });
};
