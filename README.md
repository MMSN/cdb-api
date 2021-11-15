<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Instação

```bash
$ yarn install
```

## Executando

Antes de executar o programa, é necessário usar o docker

```bash
docker compose up
```

```bash
# development
#$ yarn start

# watch mode
$ yarn start:dev

# production mode
#$ yarn start:prod
```

## Testes

```bash
# unit tests
$ yarn test

## e2e tests
#$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Como utilizar

Primeiro, como o CDB é indexado em relação ao CDI, é necessário popular o banco de CDI, através de uma file (como um CSV), o formato a ser seguido seria:

| sSecurityName | dtDate     | dLastTradePrice  |
| ------------- | ---------- | ---------------- |
| CDI           | 03/12/2019 | 4.9              |

A route seria (Post):

http://localhost:3000/historical/upload

form-data:
file: arquivo.csv

Após popular a parte de CDI, se torna possível criar investments, na seguinte route (Post):

http://localhost:3000/investment
		
JSON:
```bash
{
  "investmentDate":"2016-11-14",
  "cdbRate": 103.5,
  "currentDate":"2016-12-26"
}
```


Retorno:
```bash
{
  "createdAt": "2021-11-12T17:41:37.497Z",
  "updatedAt": "2021-11-12T17:41:37.497Z",
  "investmentDate": "2016-11-14",
  "cdbRate": 103.5,
  "currentDate": "2016-12-26",
  "_id": "618ea7519d5fed65c3151d74"
}
```


Havendo o _id o investimento, é possível ver seu desenvolvimento, através das seguintes routes:

http://localhost:3000/investment/:id/calculate

Output:
```bash
[
    {
        "date": "2016-11-14",
        "unitPrice": 1.00053396685
    },
...
    {
        "date": "2016-12-23",
        "unitPrice": 1.0116569152
    }
]
```

Ou então ter acesso ao gráfico do investimento:

http://localhost:3000/investment/:id/calculate/graph