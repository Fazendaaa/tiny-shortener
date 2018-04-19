# tiny-shortener

<div align="center">
    <br>
    <br>
    <br>
    <img width="260" src="https://raw.githubusercontent.com/Fazendaaa/tiny-shortener/blob/master/logo/tiny-shortener.png" /img>
    <br>
    <br>
    <br>

[![English README](https://img.shields.io/badge/Language-EN-blue.svg?longCache=true&style=for-the-badge)](https://github.com/Fazendaaa/tiny-shortener/blob/master/README.md)
[![Portuguese README](https://img.shields.io/badge/Linguagem-PT-green.svg?longCache=true&style=for-the-badge)](https://github.com/Fazendaaa/tiny-shortener/blob/master/docs/README_PT.md)


[![bitHound Overall Score](https://www.bithound.io/github/Fazendaaa/tiny-shortener/badges/score.svg?style=flat-square)](https://www.bithound.io/github/Fazendaaa/tiny-shortener)
[![npm](https://img.shields.io/npm/dt/express.svg?style=flat-square)](https://www.npmjs.com/package/tiny-shortener)
[![Build Status](https://travis-ci.org/Fazendaaa/tiny-shortener.svg?branch=master)](https://travis-ci.org/Fazendaaa/tiny-shortener)
[![Dependencies](https://david-dm.org/Fazendaaa/tiny-shortener.svg?style=flat-square)](https://github.com/Fazendaaa/tiny-shortener/blob/master/package.json)
[![Coverage Status](https://coveralls.io/repos/github/Fazendaaa/tiny-shortener/badge.svg?branch=master)](https://coveralls.io/github/Fazendaaa/tiny-shortener?branch=master)
[![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://github.com/Fazendaaa/tiny-shortener)
[![GitHub stars](https://img.shields.io/github/stars/Fazendaaa/tiny-shortener.svg?style=flat-square)](https://github.com/Fazendaaa/tiny-shortener/stargazers)
[![GitHub license](https://img.shields.io/github/license/Fazendaaa/tiny-shortener.svg?style=flat-square)](https://github.com/Fazendaaa/tiny-shortener/blob/master/LICENSE)


</div>

> Um novo pacote para Tiny URL em Node.js com suporte a promise/async.

## Sobre
A ideia por trás desse pacto é para uma atividade na aula de Open Source da faculdade. O professor passou uma atividade para contrubirmos em um projeto OSS.

Como o pacote [TinyURL](https://www.npmjs.com/package/tinyurl) se tornou uma grande opção após o Google desligar o seu serviço. Porém o TinyURL não possui suporte a Promise, tornando díficil o uso com os mais recentes padrões ECMA. Há um Pull Request(PR) aberto no projeto que dá suporte a isso mas não foi adicionado ao código, a ideia por trás do __tiny-shortener__ é fazer um novo pacote que suporte isso.

## Instalando
```
npm install tiny-shortener --save-dev
```

## Usando
```
import { tiny } from 'tiny-shortener';

const shortened: string = await tiny('www.microsoft.com').catch((error: Error) => console.error(error));
```

### Examplos
Veja os exemplos na pasta [examples](https://github.com/Fazendaaa/tiny-shortener/blob/master/examples).

## Por que TypeScript?
Usuários de TypeScript(TS) sofrem ao ter que fazerem typings para uma boa parte de projetos que usam, sejam eles grandes ou pequenos. Nós decidimos fazer esse projeto dessa maneira justamente para suprir essa necessidade e permitir a intereoperabilidade com JavaScript.

### Estilo de Código
Foi utilizado o padrão de código [Airbnb](https://www.npmjs.com/package/tslint-config-airbnb).

## Testes
Através do Test Driven Development(TDD), foi utilizado a ferramenta do Facebook chamada [Jest](https://facebook.github.io/jest/) como test runner através do pacote de supporte para TS chamado [ts-jest](https://www.npmjs.com/package/ts-jest), que permite rodar o código sem a necessidade de compilar ele. Veja mais dos testes na pasta [__ tests __](https://github.com/Fazendaaa/tiny-shortener/blob/master/__tests__).

## Versionamento
O versionamento é gerenciado através do npm mesmo.

## Construído com
* Basciamente Node.js + TS.

## Contribuindo
Nós estamos abertos para PR com tanto que explicite bem a necessidade através de uma issue.

## TODO
* Escrever mais exemplos;
* Suporte a CLI.

## Autores
* [Fazendaaa](https://github.com/Fazendaaa) - O primeiro e único;
* [pit00](https://github.com/pit00) - Du Hast.

## Agradecimentos
* [Mocklab](app.mocklab.io) pelo sistema de teste de API.