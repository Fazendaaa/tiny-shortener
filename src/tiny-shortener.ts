#!/usr/bin/env typescript

/**
 * Main wrapper.
 */
'use strict';

import { wrapper } from './lib/wrapper';

/**
 * This function takes a URL string then returns it's parsed version.
 * @param url link to be shorted.
 */
export const tiny = (url: string): Promise<string> => wrapper('https://tinyurl.com/api-create.php?url=', url);
