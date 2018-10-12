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

> Um novo pacote para Tiny URL em Node.js com suporte a promise/async e alias.

## Sobre
A ideia por trás desse pacto é para uma atividade na aula de Open Source da faculdade. O professor passou uma atividade para contrubirmos em um projeto OSS.

Como o pacote [TinyURL](https://www.npmjs.com/package/tinyurl) se tornou uma grande opção após o [Google](https://www.theverge.com/2018/3/31/17184164/google-alphabet-url-shortening-service-closed) desligar o seu serviço. Porém o TinyURL não possui suporte a Promise, tornando díficil o uso com os mais recentes padrões [ECMA](https://www.w3schools.com/js/js_versions.asp). Há um Pull Request(PR) aberto no projeto que dá suporte a isso mas não foi adicionado ao código, a ideia por trás do __tiny-shortener__ é fazer um novo pacote que suporte isso e dar um passo além, suportando alias para as URLs, deixando o usuário personalizar ainda mais.

obs: em casos nos quais o alias não se encontra disponível o sistema retorna um link encurtado sem a personalização apenas.

## Instalando
### Requerimentos
Como esse pacote apenas usa os padrões de [Node](https://nodejs.org/), ele será necessário como o [npm](https://www.npmjs.com/) instalado na máquina.

### npm
```
npm install tiny-shortener --save
```

## Usando
### tiny(url, [alias])
* url <string> - Link a ser encurtado;
* alias <string> - Opção de personalização;
* Retorna <Promise<string>> - Link encurtado ou erro.

### Exemplos
#### TypeScript
Com suporte a async/await porém funciona com Promises também:
```typescript
import { tiny } from 'tiny-shortener';

const asyncRequest = async (): Promise<void> => {
    const shortened = <string> await tiny('www.microsoft.com');
    const aliased = <string> await tiny('www.typescriptlang.org/', 'tslang');

    console.log(`Without alias is: ${shortened}\nWith alias: ${aliased}`);
};
```

#### JavaScript
Com suporte a Promises porém funciona com async/await também:
```javascript
const tiny = require('tiny-shortener').tiny;

tiny('www.microsoft.com')
    .then(console.log)
    .catch(console.error);

// com alias
tiny('www.typescriptlang.org/', 'tslang')
    .then(console.log)
    .catch(console.error);
```

#### CLI
```shell
tiny-shortener --url www.example.com
```

Ou até mesmo com suporte para alias:
```shell
tiny-shortener --url www.foo.com --personalization bar
```

#### Veja mais
Veja os exemplos na pasta [examples](./examples).

## Por que TypeScript?
Usuários de TS sofrem ao ter que fazerem typings para uma boa parte de projetos que usam, sejam eles grandes ou pequenos. Nós decidimos fazer esse projeto dessa maneira justamente para suprir essa necessidade e permitir a intereoperabilidade.

### Estilo de Código
Foi utilizado o padrão de código [Microsoft](https://github.com/Microsoft/tslint-microsoft-contrib).

## Testes
Através do [Test Driven Development(TDD)](https://en.wikipedia.org/wiki/Test-driven_development), foi utilizado a ferramenta do Facebook chamada [Jest](https://facebook.github.io/jest/) como test runner através do pacote de supporte para TS chamado [ts-jest](https://www.npmjs.com/package/ts-jest), que permite rodar o código sem a necessidade de compilar ele. Veja mais dos testes na pasta [ci](./ci).

## Versionamento
O versionamento é gerenciado através do npm mesmo. Você pode ver a versão desse pacote no selo no começo deste README.

## Construído com
* [commander](https://github.com/tj/commander.js).

## Contribuindo
Nós estamos abertos para PR com tanto que explicite bem a necessidade através de uma issue.

## TODO
* Escrever mais exemplos

## Autores
* [Fazendaaa](https://github.com/Fazendaaa) - O primeiro e único;
* [pit00](https://github.com/pit00) - Du Hast.

## Licença
Veja [LICENSE](./LICENSE) para mais informações.

## Agradecimentos
* [Mocklab](app.mocklab.io) - Pelo sistema de teste de API.
* Stormpath - [Este](https://stormpath.com/blog/how-to-write-middleware-for-express-apps) tutorial express tutorial na hora de escrever exemplos;
* Object Calisthenics - [Este](https://medium.com/web-engineering-vox/improving-code-quality-with-object-calisthenics-aa4ad67a61f1) post ajudou a entender um novo conceito graça ao feedback do [@vinicius73](https://t.me/vinicius73) no grupo de [Node.js](https://t.me/NodejsBR) no Telegram.
