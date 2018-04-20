# tiny-shortener

<div align="center">
    <br>
    <br>
    <br>
    <img width="260" src="https://raw.githubusercontent.com/Fazendaaa/tiny-shortener/master/logo/tiny-shortener.png" /img>
    <br>
    <br>
    <br>

[![English README](https://img.shields.io/badge/Language-EN-blue.svg?longCache=true&style=for-the-badge)](https://github.com/Fazendaaa/tiny-shortener/blob/master/README.md)
[![Portuguese README](https://img.shields.io/badge/Linguagem-PT-green.svg?longCache=true&style=for-the-badge)](https://github.com/Fazendaaa/tiny-shortener/blob/master/docs/README_PT.md)


[![bitHound Overall Score](https://www.bithound.io/github/Fazendaaa/tiny-shortener/badges/score.svg?style=flat-square)](https://www.bithound.io/github/Fazendaaa/tiny-shortener)
[![npm](https://img.shields.io/npm/dt/tiny-shortener.svg?style=flat-square)](https://www.npmjs.com/package/tiny-shortener)
[![Build Status](https://travis-ci.org/Fazendaaa/tiny-shortener.svg?branch=master)](https://travis-ci.org/Fazendaaa/tiny-shortener)
[![Dependencies](https://david-dm.org/Fazendaaa/tiny-shortener.svg?style=flat-square)](https://github.com/Fazendaaa/tiny-shortener/blob/master/package.json)
[![Coverage Status](https://coveralls.io/repos/github/Fazendaaa/tiny-shortener/badge.svg?branch=master)](https://coveralls.io/github/Fazendaaa/tiny-shortener?branch=master)
[![npm](https://img.shields.io/npm/v/tiny-shortener.svg?style=flat-square)](https://www.npmjs.com/package/tiny-shortener)
[![Maintainability](https://api.codeclimate.com/v1/badges/04c334bbe522d8a0823f/maintainability)](https://codeclimate.com/github/Fazendaaa/tiny-shortener/maintainability)


</div>

> A new Tiny URL package for Node.js with promise/async support.

## About
The idea behind this package is for a Open Source class taken at college. The professor wanted us to make a contribution to an OSS project.

Since the [TinyURL](https://www.npmjs.com/package/tinyurl) package is a great option after [Google](https://www.theverge.com/2018/3/31/17184164/google-alphabet-url-shortening-service-closed) has shut down it's shortener service. But the TinyURL has no Promise support, making it difficult to use with any new [ECMA](https://www.w3schools.com/js/js_versions.asp) standards. As there is a Pull Request(PR) opened supporting this in the project and still isn't merged, the idea behind __tiny-shortener__ is to make a new package that supports this.

## Installing
### Requirements
Since this package uses only [Node](https://nodejs.org/) packages as support, Node will be needed as [npm](https://www.npmjs.com/) installed.

### npm
```bash
npm install tiny-shortener --save-dev
```

## Using it
### TypeScript
With async/await support but works with Promises as well:
```typescript
import { tiny } from 'tiny-shortener';

const shortened = <string> await tiny('www.microsoft.com').catch((error: Error) => console.error(error));
```

### JavaScript
With Promises support but works with async/await as well:
```javascript
const tiny = require('tiny-shortener');

tiny('www.microsoft.com').then(shortened => {
    console.log(shortened);
}).catch(error => {
    console.error(error);
});
```

### Examples
See more in the [examples](https://github.com/Fazendaaa/tiny-shortener/blob/master/examples) folder. Only TypeScript(TS) examples, to see JavaScript(JS) examples clone this project and generate the examples through:

```bash
npm run build
```

## Why TypeScript?
TS users suffer from having to make the typings for a large part of little projects. We've decide to make this as a TS project to allow a painless interoperability.

### Style code
Using the [Airbnb](https://www.npmjs.com/package/tslint-config-airbnb) style code.

## Testing
With [Test Driven Development(TDD)](https://en.wikipedia.org/wiki/Test-driven_development) in mind, we've used the Facebook's [Jest](https://facebook.github.io/jest/) test runner through the [ts-jest](https://www.npmjs.com/package/ts-jest) package to run with the need to compiling the code. See more in [__ tests __](https://github.com/Fazendaaa/tiny-shortener/blob/master/__tests__) folder;

## Versioning
Versioning is made through npm versioning system. You can see what version is in the badge at the top of this README.

## Build with
* Basically Node.js + TS.

## Contributing
We're opened to PRs as long you open an issue before explaining what you will be pushing and we will see if fits.

## TODO
* Write some more examples;
* CLI support.

## Authors
* [Fazendaaa](https://github.com/Fazendaaa) - The one and only;
* [pit00](https://github.com/pit00) - Du Hast.

## License
See [LICENSE](https://github.com/Fazendaaa/tiny-shortener/blob/master/LICENSE) for more about it.

## Acknowledges
* [Mocklab](app.mocklab.io) - System of mocking API request for testing;
* Stormpath - [This](https://stormpath.com/blog/how-to-write-middleware-for-express-apps) express tutorial for writing examples.
