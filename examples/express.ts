#!/usr/bin/env typescript

/**
 * Express example with async/await support.
 */
'use strict';

import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { tiny } from '../src/tiny-shortener';

const app = express();
const asyncRouter = express.Router();
const promiseRouter = express.Router();
const port = 8080;

/**
 * Tiny router for express.
 * @param req - Requisition body;
 * @param res - Response body;
 * @param next - Callback to next event.
 */
const shortenerAsync = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const link = <string> await tiny('www.microsoft.com').catch((error: Error) => console.error(error));

    console.log('Async request.');
    res.write(link);
    next();
};

const shortenerPromise = (req: Request, res: Response, next: NextFunction): void => {
    tiny('www.typescriptlang.org/').then((sortened: string) => {
        console.log('Promise request.');
        res.write(sortened);
        next();
    }).catch((error: Error) => console.error(error));
};

/**
 * This app sends a Microsoft shortened link to user.
 */
app.get('/async', asyncRouter.use(shortenerAsync));

/**
 * This app sends a TypeScript shortened link to user.
 */
app.get('/promise', promiseRouter.use(shortenerPromise));

app.listen(port, () => {
    console.log(`App listening on port ${port}.`);
});
