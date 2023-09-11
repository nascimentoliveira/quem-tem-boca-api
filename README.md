![created date - quem-tem-boca-api](https://img.shields.io/date/1689562800?color=007ec6&label=created&style=flat-square)
![license - quem-tem-boca-api](https://img.shields.io/github/license/nascimentoliveira/quem-tem-boca-api?color=007ec6&style=flat-square)
![last commit - quem-tem-boca-api](https://img.shields.io/github/last-commit/nascimentoliveira/quem-tem-boca-api?color=007ec6&style=flat-square)
![repo size - quem-tem-boca-api](https://img.shields.io/github/repo-size/nascimentoliveira/quem-tem-boca-api?color=007ec6&style=flat-square)
![files - quem-tem-boca-api](https://img.shields.io/github/directory-file-count/nascimentoliveira/quem-tem-boca-api?color=007ec6&style=flat-square)
![language - quem-tem-boca-api](https://img.shields.io/github/languages/top/nascimentoliveira/quem-tem-boca-api?color=007ec6&style=flat-square)
![stars - quem-tem-boca-api](https://img.shields.io/github/stars/nascimentoliveira/quem-tem-boca-api?color=007ec6&style=flat-square)
![forks - quem-tem-boca-api](https://img.shields.io/github/forks/nascimentoliveira/quem-tem-boca-api?color=007ec6&style=flat-square)

#  🚧👷🏻 API (Back-end) da Aplicação Quem Tem Boca  👷🏻🚧

> 🚧👷🏻 Quem Tem Boca está sendo desenvolvido! Algumas funcionalidades podem não estar disponíveis.

Aqui você encontrará informações sobre a estrutura da API, como executá-la localmente, configurar as dependências e realizar as requisições corretamente.

> O código-fonte do front-end da aplicação está hospedado no GitHub em: [Quem Tem Boca Front-end](https://github.com/nascimentoliveira/quem-tem-boca)

> Quem Tem Boca atualmente pode ser experimentado em: [Quem Tem Boca Live Demo](https://quem-tem-boca-nascimentoliveira.vercel.app/)
>
>> *A primeira requisição ao Live Demo pode levar um pouco mais de tempo para carregar. Isso ocorre porque os servidores são ativados conforme necessário e podem levar alguns instantes para iniciar!*
>>

## Tecnologias Utilizadas

A API da aplicação Quem Tem Boca foi desenvolvido utilizando as seguintes tecnologias:

- Linguagem de Programação:

  - [TypeScript](https://www.typescriptlang.org/): Linguagem de programação de código aberto que estende a sintaxe do JavaScript, fornecendo tipagem estática opcional e outros recursos para melhorar o desenvolvimento.
  
- Framework:

  - [Nest.JS](https://nestjs.com/): Um framework para construção de aplicações web escaláveis e eficientes, baseado em Node.js e TypeScript, que oferece uma abordagem modular e orientada por componentes para o desenvolvimento de back-ends robustos.
  
- Back-end

  - [Node.js](https://nodejs.org/en/about): Plataforma de desenvolvimento JavaScript assíncrona baseada no motor V8 do Chrome.
  - [Dotenv](https://www.npmjs.com/package/dotenv): Pacote para carregar variáveis de ambiente a partir de um arquivo .env.
   - [Bcrypt](https://www.npmjs.com/package/bcrypt): Biblioteca para criptografia de senhas.
   - [class-validator](https://github.com/typestack/class-validator): Biblioteca para validação de dados.
   - [JWT](https://www.npmjs.com/package/jsonwebtoken): Biblioteca para geração e validação de tokens de autenticação.
   - [Jest](https://jestjs.io/): Framework de teste JavaScript com foco na simplicidade e na experiência do desenvolvedor. Utilizado para testes unitários e de integração.
  
- Banco de Dados:

  - [PostgreSQL](https://www.postgresql.org/about/): Sistema de gerenciamento de banco de dados relacional, utilizado para armazenar e persistir os dados da aplicação.
  - [Prisma ORM](https://www.prisma.io/): ORM (Object-Relational Mapping) de banco de dados, utilizado para facilitar a comunicação e manipulação de dados com o banco de dados PostgreSQL.

Essas tecnologias foram escolhidas para proporcionar uma experiência de desenvolvimento moderna, eficiente e escalável.

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em seu computador:

- Node.js (versão 18.16 ou superior)
- NPM (versão 9.8 ou superior)
- dotenv-cli (versão 2.2.0 ou superior)

## Instalação

Siga as etapas abaixo para instalar, configurar e executar a API localmente:

1. Clone o repositório do projeto:

   ```bash
   git clone https://github.com/nascimentoliveira/quem-tem-boca-api.git
   ```
2. Acesse o diretório do projeto:

   ```bash
   cd quem-tem-boca-api
   ```
3. Instale as dependências do projeto:

   ```bash
   npm install
   ```
4. Configure as variáveis de ambiente:Antes de executar a aplicação, é necessário configurar as variáveis de ambiente corretamente. Siga os passos abaixo:

   - Renomeie o arquivo `.env.example` para `.env`:
     ```bash
     mv .env.example .env
     ```
   - Agora, abra o arquivo `.env` em um editor de texto.
   - Procure a variável `DATABASE_URL` e defina-a com as configurações de acesso ao banco de dados. Exemplo:
     ```bash
     DATABASE_URL=postgresql://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}?schema=public
     ```
   - Verifique se existem outras variáveis de ambiente necessárias para o funcionamento da aplicação e defina-as de acordo com a sua configuração.
   - Salve o arquivo `.env`.

   *Certifique-se de não compartilhar o arquivo `.env` contendo informações sensíveis, como senhas, chaves de API ou tokens de acesso. Mantenha-o seguro e fora do controle de versão do seu repositório.*

5. Realize as migrações do Prisma ORM para criar a estrutura do banco de dados. Execute o seguinte comando:

   ```bash
   npm run dev:migration:run
   ```

   Isso aplicará as migrações pendentes no banco de dados especificado no arquivo `.env`, criando as tabelas e as relações necessárias.
6. Agora, a aplicação estará pronta para ser executada.

## Executando a API

Após a configuração, você pode iniciar a API executando o seguinte comando:

```bash
$ npm run start:dev
```

A API será iniciada e estará pronta para receber requisições e será iniciada na porta especificada no arquivo `.env` (por padrão, é a porta 5000).

```bash
  http://localhost:5000/api/
```

ou

```bash
  http://localhost:<porta_especificada>/api
```

## Endpoints

> 🚧👷🏻 Quem Tem Boca está sendo desenvolvido! Novos endpoints estarão disponíveis em breve.

A documentação completa dos endpoints, incluindo detalhes sobre como usar cada rota, parâmetros e exemplos de resposta, está disponível na [documentação interativa](https://quem-tem-boca-api.onrender.com/api/documentation) da API.

Recomendamos consultar a documentação para obter informações abrangentes sobre os endpoints e aproveitar ao máximo as funcionalidades oferecidas. A seguir estão os endpoints disponíveis nesta API.

```
GET /api/health
```

```
POST /api/auth
```

```
POST /api/users
```

```
*🔐 GET /api/users
```

```
*🔐 GET /api/users/{id}
```

```
*🔐 PUT /api/users/{id}
```

```
*🔐 DELETE /api/users/{id}
```

*🔐 *Rotas autenticadas com token JWT. Necessário logar na aplicação!*

## Contribuição

Se você deseja contribuir para o projeto, siga os passos abaixo:

1. Faça um `fork` do repositório.
2. Crie uma nova `branch` com a sua contribuição:
   ```bash
   git checkout -b <sua-contribuicao>
   ```
3. Faça as suas modificações  no código.
4. Faça `commit` das suas alterações:
   ```bash
   git commit -m "Sua contribuição"
   ```
5. Envie as alterações para o repositório remoto: .
   ```bash
   git push origin <sua-contribuicao>
   ```
6. Abra um `pull request` no repositório original, descrevendo as modificações realizadas.

Se te ajudei de alguma forma, ficarei feliz em saber. Se possível:
⭐️ dê uma estrela para este projeto; e
🪲 Encontre e relate `issues`

## Licença

Este projeto é licenciado sob a licença [MIT](https://choosealicense.com/licenses/mit/). Consulte o arquivo LICENSE para obter mais informações.

Disponibilizado por [Thiago Oliveira](https://www.linkedin.com/in/nascimentoliveira/).