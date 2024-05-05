# TRIP FLOW - Plataforma de Turismo Sustentável

## Sobre a construção da API

   ### Apresentação da API TRIP FLOW 
   Trata-se de uma plataforma para promover viagens sustentáveis e experiências positivas para os usuários, fornecendo acesso a informações sobre destinos turísticos, praias, atrações naturais e atividades recreativas.

    Os usuários podem explorar e descobrir novos destinos, encontrar dicas de viagem sustentável, compartilhar suas experiências e avaliações, inclusive quanto à acessibilidade e coleta de lixo seletiva.
 
    Assim, o usuário terá como guardar todos os locais visitados e avaliados, para poder acessá-las futuramente e até mesmo compartilhar experiências com amigos.

    As funcionalidades incluem o cadastro de novos usuários, listagem, edição e seleção de destinos, visualização de informações dos destinos, entre outras.

   Este projeto é uma solução simples e eficiente voltada ao turismo sustentável para facilitar a criação de roteiros de viagens e compartilhamento de experiências entre os viajantes.

   Este é apenas o MVP, sendo que a proposta final da API busca atender à dificuldade dos usuários em planejar viagens a partir de uma plataforma que traga roteiros individualizados de viagem, incluindo atrações turísticas, hoteis e restaurantes, a partir das seleções feitas pelos usuários e considerando as avaliações dos demais usuários.

   ### API desenvolvida em Node.js 
   O projeto de backend desta API Rest foi construído com a linguagem de programação JavaScript, com utilização do ambiente de execução Node.js e do framework Express. A ORM escolhida foi o Sequelize, para facilitar e dar segurança ao relacionamento com o banco de dados PostgreSQL. 

   ### ESTRUTURA DA API 
   A API é construída seguindo os princípios RESTful, que definem a forma como as requisições e respostas HTTP devem ser formatadas, garantindo a padronização da comunicação entre os clientes e o servidor. 

   Este projeto segue uma estrutura de organização baseada em funcionalidades e ajuda a manter o código organizado e fácil de navegar, além de facilitar o trabalho colaborativo com outros desenvolvedores. Na pasta src, constam as seguintes pastas:
   1. config: contém todos os arquivos de configuração do projeto, como configurações de banco de dados e variáveis de ambiente.
   2. controllers: traz os responsáveis por manipular as solicitações e respostas HTTP.
   3. database: contém tudo relacionado ao banco de dados, inclusive uma pasta com as migrations.
   4. middlewares: onde estão as funções middleware.
   5. models: traz os modelos, que definem a estrutura das tabelas do banco de dados e as relações entre elas.
   6. routes: contém as rotas da aplicação, que definem os endpoints da API e como eles respondem às solicitações do cliente.
   7. services: Os serviços contêm a lógica de negócios da aplicação. Eles são chamados pelos controladores e podem chamar os modelos para interagir com o banco de dados.

## Configurar o repositório:

   ### Se quiser iniciar o repositório local:
   1. Cria uma pasta local e abre no VsCode
   2. Iniciar novo repositório local: `git init`

   ### Para copiar o repositório remoto:
   1. Copiar: `git clone https://github.com/Keeity/tripFlow`

## Variáveis de ambiente
   1. Criar arquivo `.env` com base no arquivo `.env_example`
   2. Preencher:
        DIALECT=`dialeto do banco de dados utilizado`. Exemplo: `postgres`
        HOST: `endereço do host do seu banco de dados`. Exemplo: `localhost`
        USERNAMEDB: `nome de usuário usado para se conectar ao seu banco de dados`. Exemplo: `postgres`
        PASSWORDDB: `senha usada para se conectar ao seu banco de dados`. Exemplo: `senha`
        DATABASE: `nome do banco de dados ao qual você deseja se conectar`. Preencher com `viagem365`.
        PORT: `porta na qual o seu banco de dados está escutando`. Exemplo: `5432`
        PORT_API: `porta na qual a API estará rodando`. Exemplo: `3000`.
        SECRET_WJT=`palavra chave escolhida para utilizar o jwt`. Exemplo: `senha`

## Criar tabelas e Rodar o repositório:

   ### Para começar a utilizar, é necessário instalar as dependencias (node_modules):
   1. `npm install`
   2. Se for em ambiente local: `npm install --dev`

## Criar banco de dados e rodar migrations:

   ### Criar o banco de dados 
   1. Crie o banco de dados `viagem365`. 
   2. Fora do projeto, pode utilizar outros dialetos e ferramentas de administração de banco de dados, desde que especificado no `.env`.
  
   ### Rodar migrations. Opções:
   1. Opção nº 1: `sequelize db:migrate`
   2. Opção nº 2: `npx sequelize db:migrate`

   ### Reverter a última migration:
   1. Opção nº 1: `sequelize-cli db:migrate:undo`
   2. Opção nº 2: `npx sequelize-cli db:migrate:undo`

## Criar valores com o Seeders

   ### Incluir valores iniciais no banco de dados. Opções:
   1. Opção nº 1: `sequelize db:seed:all`
   2. Opção nº 2: `npx sequelize db:seed:all`

   ### Incluir valores iniciais no banco de dados. Opções:
   1. Opção nº 1: `sequelize-cli db:seed:undo`
   2. Opção nº 2: `npx sequelize-cli db:seed:undo`

## Rodar o repositório:

   ### Para rodar o repositório em ambiente local
   1. `npm run start`


## Documentações:

   ### Documentação da API TripFlow:
   Se a porta da API for 3000: `http://localhost:3000/docs`

   ### Documentação do Sequelize: 
   `https://sequelize.org/docs/v6/core-concepts/model-basics/`

   ### Documentação do JWT: 
   `https://jwt.io/`

   ### Documentação do Swagger: 
   `https://swagger-autogen.github.io/docs`

## Links da API

   ### Repositório do GITHUB
   `https://github.com/Keeity/tripFlow`

   ### Vídeo apresentando a API
   `lll`

 ### Draw.io
 `https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=tripflow.drawio#R7Ztdc%2BMmFIZ%2FjS%2B3Y0mW41zWbtKPTdqdzc6mvcTiWGYWgQZhO86v70FClhWcNJ2W0gtmPBNzQBh4XhB6iSbZqnr6UZF6ey8p8Ek6pU%2BT7IdJmiazfIp%2FTOTYRfKFDZSK0S50Fnhgz2Cv7KM7RqGxsS6kpeSa1eNgIYWAQo9iRCl5GBfbSE5HgZqUMGqGCTwUhINT7JFRve2ii%2FRqiP8ErNz2v5zMr7ucivSFbcXNllB5OAtlN5NspaTU3bfqaQXcDN54XG5fyT01TIHQ77ng93qVfPz6%2BMtyKu8%2B6ls%2B%2F%2BNWfLC17Anf2Q7vGlCNbbE%2B9sPQHFjFicDUciOFfrA5U0wXW8bpHTnKnWlGo0nxrU8tt1KxZyxPOGYlGMBspS3ldD4q8WCutHUqaLDMp75vyYvQPXkaFbwjje5bIzkndcPWbfvMhRVRJRNLqbWsbCHCWSnwe4F1ger71LUqmZk043wluVRt7zOaw4LO2uYr%2BQ3OchbpOpubfthxBKXh6VVAyQk7zheQFWh1xCL2gg%2B5lc5pqnTJw6C7ZG7FtD3TXJbPrd6t1stT1YMc8ItVxN9QR3rtyAPLv9QG9lg7YyNkJ5azgbShpiYFE%2BUdbEz7Z0Pks%2B2SCUkcyQ1vp8uWUQrCsJaaaLI%2BCa%2BWTOi2y%2FkSPzgyq%2Bl3%2BSTHNq0wnQxp%2FJjiSq%2BkwGYS1gIBVM0BjHJG%2FJHQ8rBlGh6wWSZywJXNKFVXvYrfBfv1%2BeYqwBJP5%2B8kPvUF3OEtSAWRuDfieWjimUO8BEFxUYzMfTFfhGburupFvYnAvQHHTWFg4v1u%2Bhw51BG5P%2BSz4MjdlZ1Qivtld3Mfsf9r2K%2BCY3ef6Cz2X3fVOt7Xfe7ep8Hhu%2Ft3C38lq5pDZboXBeBNAFlwAcwcAUBFGI%2FQPT6zB4eeO9Br0jQHqaJX45H7dWju7lxXkkezxh%2FyLLg%2F5870ppY62vUv7HoCi03haB5z5sUC1pv3SuRtuz6b2jOg3tZ5nzZmV77c%2Bsx9yI9u%2FT9aDvK%2FuPMHXg3mDu%2Fo1nslHtytv3KIU2gKxWrNpIjgvYEPbtknC4d8NHB9Ev8fePbu8h4NXO%2FYg%2Fv22au%2BffTw%2FgsBhHfw3eNZrLs0%2F17HipWUijJBNMRVwOPOPryT7%2B70CoReSlt35O6Fe3ADP71wglPg2v%2FlWMcHO5%2BP8sHBX7rt77FPOwV3sId4hOORfnArP3W9%2FEI2cZ%2Fnj3l4Lz91n%2B8U3uIjc3%2FMg%2Ft3qbutI4W5v7M140zHvZ1H%2BME9vPTC6R1wKDTbwyOOl%2BHbJqOV61EHs%2BDGnmvlmneufqYRuj%2Fo4W0998HO4Q20hP6oHnuL94PPwIlZD26GHGdIz4YPBP3evPOIyZvPz6DkF3lPxHFiD%2FKHvIoI%2BlsrGiV3ggK15M%2FP%2BxddhTaVY6rYqX1bdEBlmvwqKBtq5E4V8NbCaB0v%2FPES3oK8uAz5HOr0AtRTULXDuR%2B3%2BBJq%2BxufzESYnE78r%2B0C3t9RZtfjGrqO2osGvTj1JC8qSl9W1A2EU1ErvFO%2FL2kRk8MLpV3x4bXc7OZP`