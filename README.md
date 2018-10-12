# tiny-shortener

<div align="center">
    <br>
    <img width="260" src="./logo/tiny-shortener.png" /img>
    <br>

[![English README](https://img.shields.io/badge/Language-EN-blue.svg?longCache=true&style=for-the-badge)](./README.md)
[![Portuguese README](https://img.shields.io/badge/Linguagem-PT-green.svg?longCache=true&style=for-the-badge)](./README.PT.md)


[![npm](https://img.shields.io/npm/v/tiny-shortener.svg?style=flat-square)](https://www.npmjs.com/package/tiny-shortener)
[![npm](https://img.shields.io/npm/dt/tiny-shortener.svg?style=flat-square)](https://www.npmjs.com/package/tiny-shortener)
[![Maintainability](https://api.codeclimate.com/v1/badges/04c334bbe522d8a0823f/maintainability)](https://codeclimate.com/github/Fazendaaa/tiny-shortener/maintainability)
[![Build Status](https://travis-ci.org/Fazendaaa/tiny-shortener.svg?branch=master)](https://travis-ci.org/Fazendaaa/tiny-shortener)
[![Dependencies](https://david-dm.org/Fazendaaa/tiny-shortener.svg?style=flat-square)](https://github.com/Fazendaaa/tiny-shortener/blob/master/package.json)
[![codecov](https://img.shields.io/codecov/c/github/Fazendaaa/endeavor.svg?style=flat-square)](https://codecov.io/gh/Fazendaaa/tiny-shortener)

</div>

> A new Tiny URL package for Node.js with promise/async and alias support.

## About
The idea behind this package is for a Open Source class taken at college. The professor wanted us to make a contribution to an OSS project.

Since the [TinyURL](https://www.npmjs.com/package/tinyurl) package is a great option after [Google](https://www.theverge.com/2018/3/31/17184164/google-alphabet-url-shortening-service-closed) has shut down it's shortener service. But the TinyURL has no Promise support, making it difficult to use with any new [ECMA](https://www.w3schools.com/js/js_versions.asp) standards. As there is a Pull Request(PR) opened supporting this in the project and still isn't merged, the idea behind __tiny-shortener__ is to make a new package that supports this and goes a step further supporting alias, letting the user personalize the shortened URL.

obs: in case that that the alias isn't available the request still works but falls back to an default shortened link.

## Installing
### Requirements
Since this package uses only [Node](https://nodejs.org/) packages as support, Node will be needed as [npm](https://www.npmjs.com/) installed.

### npm
```bash
npm install tiny-shortener --save
```

## Using it

### tiny(url, [alias])
* url <string> - Link to be shortened;
* alias <string> - Wanted personalization link;
* Returns <Promise<string>> - Shortened link or rejects an error.

### Examples
#### TypeScript
With async/await support but works with Promises as well:
```typescript
import { tiny } from 'tiny-shortener';

const asyncRequest = async (): Promise<void> => {
    const shortened = <string> await tiny('www.microsoft.com');
    const aliased = <string> await tiny('www.typescriptlang.org/', 'tslang');

    console.log(`Without alias is: ${shortened}\nWith alias: ${aliased}`);
};
```

#### JavaScript
With Promises support but works with async/await as well:
```javascript
const tiny = require('tiny-shortener').tiny;

tiny('www.microsoft.com')
    .then(console.log)
    .catch(console.error);

// with alias
tiny('www.typescriptlang.org/', 'tslang')
    .then(console.log)
    .catch(console.error);
});
```

#### CLI
```shell
tiny-shortener --url www.example.com
```

Or even with alias support:
```shell
tiny-shortener --url www.foo.com --personalization bar
```

#### See more
See more in the [examples](./examples) folder.

## Why TypeScript?
TS users suffer from having to make the typings for a large part of little projects. We've decide to make this as a TS project to allow a painless interoperability.

### Style code
Using the [Microsoft](https://github.com/Microsoft/tslint-microsoft-contrib) style code.

## Testing
With [Test Driven Development(TDD)](https://en.wikipedia.org/wiki/Test-driven_development) in mind, we've used the Facebook's [Jest](https://facebook.github.io/jest/) test runner through the [ts-jest](https://www.npmjs.com/package/ts-jest) package to run with the need to compiling the code. See more in [ci](./ci) folder;

## Versioning
Versioning is made through npm versioning system. You can see what version is in the badge at the top of this README.

## Build with
* [commander](https://github.com/tj/commander.js).

## Contributing
We're opened to PRs as long you open an issue before explaining what you will be pushing and we will see if fits.

## TODO
* Write some more examples

## Authors
* [Fazendaaa](https://github.com/Fazendaaa) - The one and only;
* [pit00](https://github.com/pit00) - Du Hast.

## License
See [LICENSE](./LICENSE) for more about it.

## Acknowledges
* [Mocklab](app.mocklab.io) - System of mocking API request for testing;
* Stormpath - [This](https://stormpath.com/blog/how-to-write-middleware-for-express-apps) express tutorial for writing examples;
* Object Calisthenics - [This](https://medium.com/web-engineering-vox/improving-code-quality-with-object-calisthenics-aa4ad67a61f1) post helped to understand a new concept thanks to [@vinicius73](https://t.me/vinicius73) feedback on a [Node.js](https://t.me/NodejsBR) Telegram group.
