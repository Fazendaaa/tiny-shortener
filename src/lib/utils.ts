#!/usr/bin/env typescript

/**
 * Utils lib.
 */
'use strict';

/**
 * Since Tiny URL works only with URL links that have WWW attached to it, this function does this checking.
 */
export const verifyURL = (url: string): string => {
    if (url.includes('https://www.') || url.includes('http://www.')) {
        return '&url='.concat(url);
    }
    /**
     * There's  some  web  sites, like Github, where when the link is copied than pasted it comes with https but without
     * www. And since cases with both were matched before, this conditional only runs without www attached to URL.
     */
    else if (url.includes('https://') || url.includes('http://')) {
        return '&url=www.'.concat(url);
    }
    /**
     * Even  if the target web site allows https requests, won't matter. But in case that doesn't some might not work at
     * all.
     */
    else if (url.includes('www.')) {
        return '&url=http://'.concat(url);
    }

    return '&url=http://www.'.concat(url);
};

/**
 * In case that the user wants a personalized link.
 */
export const verifyAlias = (alias: string): string => {
    return undefined !== alias ? '&alias='.concat(alias) : '';
};

/**
 * Return the shortened link with or without personalized alias.
 */
export const parseResponse = (response: string): string => {
    const matcher: RegExp = /<b>(https\:\/\/tinyurl\.com\/\S+)<\/b>/;
    const link = response.match(matcher);

    if (null !== link) {
        return link[1];
    }

    return response;
};
