import fastify from 'fastify';
import { knex } from './database';
import { randomUUID } from 'node:crypto';

const app = fastify();

app.get('/hello', async () => {
  const transactinos = await knex('transactions').select('*')
  return 'Hello World'
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log(`server running on port ${3333}`);
  });
