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
$ yarn start:dev
```

## Testes

```bash
$ yarn test

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