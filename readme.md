# TRIP FLOW

## API desenvolvida em Node.js
Neste projeto, foi desenvolvida uma plataforma para promover viagens sustentáveis e experiências
positivas para os usuários, fornecendo acesso a informações sobre destinos turísticos, praias,
atrações naturais e atividades recreativas.

 Os usuários podem explorar e descobrir novos
destinos, encontrar dicas de viagem sustentável, compartilhar suas experiências e avaliações, inclusive quanto à acessibilidade e coleta de lixo seletiva.

 As funcionalidades incluem o cadastro de novos usuários, listagem, edição e seleção de destinos, visualização de informações dos destinos, entre outras.
 
O projeto de backend desta API Rest foi construído com a linguagem de programação JavaScript, com utilização do ambiente de execução Node.js e do framework Express. A ORM escolhida foi o Sequelize, para facilitar e dar segurança ao relacionamento com o banco de dados PostgreSQL. 

A API é construída seguindo os princípios RESTful, que definem a forma como as requisições e respostas HTTP devem ser formatadas, garantindo a padronização da comunicação entre os clientes e o servidor. 

Em resumo, este projeto é uma solução simples e eficiente para a criação de uma API voltada ao turismo sustentável e de forma a criar uma ferramenta para facilitar a criação de roteiros de viagens e compartilhamento dde experiências entre os viajantes.

## Configurar o repositório:

   ## Se quiser iniciar o repositório local:
   1. Cria uma pasta local e abre no VsCode
   2. Iniciar novo repositório local: `git init`

   ## Para copiar o repositório remoto:
   1. Copiar: `git clone https://github.com/Keeity/tripFlow`

## Rodar o repositório:

   ### Para começar a utilizar, é necessário instalar as dependencias (node_modules):
   1. `npm install`
   2. Se for em ambiente local: `npm install --dev`
   3. Criar arquivo `.env` com base no arquivo `.env_example`

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

   ## Documentação do Sequelize: 
   `https://sequelize.org/docs/v6/core-concepts/model-basics/`

   ## Documentação do JWT: 
   `https://jwt.io/`

   ## Documentação do Swagger: 
   `https://swagger-autogen.github.io/docs`
