/**
 * Gets provided URL and then returns it as a query to be sent to tinyurl
 *
 * @param url URL to be sent to be shortened
 * @example
 * parseURL('www.example.com');
 * @returns The new query to be sent to tinyurl
 */
export const parseURL = (url: string): string => {
    // tslint:disable-next-line:no-http-string
    if (url.includes('https://www.') || url.includes('http://www.')) {
        return '&url='.concat(url);
    // tslint:disable-next-line:no-http-string
    } if (url.includes('https://') || url.includes('http://')) {
        return '&url=www.'.concat(url);
    } if (url.includes('www.')) {
        return '&url=http://'.concat(url);
    }

    return '&url=http://www.'.concat(url);
};

/**
 * Gets the response from tinyurl and then fetches the shortened url and returns it
 * @param response A HTML page
 * @example
 * parseResponse('<HTML>...</HTML>');
 * @returns The shortened URL
 */
export const parseResponse = (response: string): string => {
    const link = response.match(/<b>(https\:\/\/tinyurl\.com\/\S+)<\/b>/);

    return (null !== link) ? link[1] : response;
};

/**
 * Gets provided alias and then returns it as a query to be sent to tinyurl
 *
 * @param alias Alias to be sent to be shortened
 * @example
 * parseURL('foo');
 * @returns The new query to be sent to tinyurl
 */
export const parseAlias = (alias: string): string => undefined !== alias ? '&alias='.concat(alias) : '';
