#!/usr/bin/env typescript

'use strict';

import { wrapper } from './lib/wrapper';

const baseURL = 'https://tinyurl.com/create.php?source=indexpage';

export const tiny = (url: string, alias?: string): Promise<string> => wrapper(baseURL, url, alias);
