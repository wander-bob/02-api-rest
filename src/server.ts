import fastify from 'fastify';
import { knex } from './database';
import { randomUUID } from 'node:crypto';

const app = fastify();

app.get('/hello', async () => {
  const transactions = await knex('transactions').where('amount', 7.5).select('*');

  return transactions
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log(`server running on port ${3333}`);
  });
