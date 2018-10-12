#!/usr/bin/env node
import * as commander from 'commander';
import { tiny } from './tiny-shortener';

async function shortenUrl(url: string, alias?: string) {
    const shortURL = await tiny(url, alias);
    console.log(shortURL);
}

commander
    .version('1.3.0')
    .description('Tiny shortener');

commander
    .option('-u, --url [url]', 'link to be shortened')
    .option('-p, --personalization [personalization]', 'wanted personalization link');

commander.parse(process.argv);

// if url option isn't set, use the first arg encountered
const url = commander.url || (commander.args.length && commander.args[0]);

if (url) {
    shortenUrl(url, commander.personalization);
} else {
    commander.outputHelp();
}
