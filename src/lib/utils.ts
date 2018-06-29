#!/usr/bin/env typescript

'use strict';

export const verifyURL = (url: string): string => {
    if (url.includes('https://www.') || url.includes('http://www.')) {
        return '&url='.concat(url);
    } if (url.includes('https://') || url.includes('http://')) {
        return '&url=www.'.concat(url);
    } if (url.includes('www.')) {
        return '&url=http://'.concat(url);
    }

    return '&url=http://www.'.concat(url);
};

export const verifyAlias = (alias: string): string => {
    return undefined !== alias ? '&alias='.concat(alias) : '';
};

export const parseResponse = (response: string): string => {
    const matcher: RegExp = /<b>(https\:\/\/tinyurl\.com\/\S+)<\/b>/;
    const link = response.match(matcher);

    if (null !== link) {
        return link[1];
    }

    return response;
};
