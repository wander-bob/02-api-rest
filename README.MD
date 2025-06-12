# Rocketseat - Trilha Ignite Módulo 02 - API Rest
Esse repositório foi criado para colocar em prática os conhecimentos que estou contruindo através da trilha Ignite de Node.js da Rocketseat, onde nós estamos criando uma API REST completa, com testes e também deploy.

## Tecnologias utillizadas: 

- Fastify: Microframework HTTP
- SQLite: Um banco mais simples para um projeto mais simples
- Knex.js: Query builder para poder fazer o processo de desenvolvimento mais simples.
- Zod: Para validação de dados
- Vitest: Para criação dos testes de aplicação

## Fluxo da aplicação
Nossa aplicação é muito simples e só terá rotas para registro de uma transação e que será "autenticada" utilizando cookies de sessão que serão criados apenas no momento em que a transação for criada. Esse cookie irá ter uma sessão de usuário e que será associada a cada transação.

## Modelo de dados da transação: 

- id: UUID
- title: Nome da transação
- amount: Valor decimal da transação (2 casas)
- session_id: ID da sessão do usuário que cadastrou a transação
- created_at: Data de cadastro.

## Rotas da aplicação

-`POST /transactions/`: Criação de uma transação.
  -  Registra uma transação baseado no cookie de sessão do usuário, caso não exista o cookie com o session id, será gerado um novo para o usuário e associado a transação.
-`GET  /transactions/`: Listagem de todas as transações.
-`GET  /transactions/:id`: Listagem de uma transação em específico.
-`GET  /transactions/summary`: Exibe um resumo das transações do usuário.