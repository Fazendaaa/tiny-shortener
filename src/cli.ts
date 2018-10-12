#!/usr/bin/env node
import * as commander from 'commander';
import { tiny } from 'tiny-shortener';

const shortenUrl = async (output: string, alias?: string): Promise<void> => tiny(output, alias).then(console.log);

commander
    .version('2.0.0')
    .description('Tiny shortener');

commander
    .option('-u, --url [url]', 'link to be shortened')
    .option('-p, --personalization [personalization]', 'wanted personalization link');

commander.parse(process.argv);

let url = '';

if (undefined !== commander.url) {
    url = commander.url;
} if (1 < commander.args.length) {
    url = commander.args[0];
}

if ('' !== url) {
    shortenUrl(url, commander.personalization);
} else {
    commander.outputHelp();
}
