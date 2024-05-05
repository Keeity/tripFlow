# TRIP FLOW

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

## Rodar o repositório:

   ### Para começar a utilizar, é necessário instalar as dependencias (node_modules):
   1. `npm install`
   2. Se for em ambiente local: `npm install --dev`

   ### Para rodar o repositório em ambiente local
   1. `npm run start`

## Interagindo com banco de dados com migrations:

   ### Criar uma migration
   1. `sequelize migration:generate --name xxxx`
   2. `npx sequelize-cli migration:generate --name criar_tabela_alunos`

   ### Rodar migrations. Opções:
   1. Opção nº 1: `sequelize db:migrate`
   2. Opção nº 2: `npx sequelize db:migrate`

   ### Reverter a última migration:
   1. `sequelize-cli db:migrate:undo`
   2. `npx sequelize-cli db:migrate:undo`

## Documentações:

   ### Documentação do Sequelize: 
   `https://sequelize.org/docs/v6/core-concepts/model-basics/`

   ### Documentação do JWT: 
   `https://jwt.io/`

   ### Documentação do Swagger: 
   `https://swagger-autogen.github.io/docs`
