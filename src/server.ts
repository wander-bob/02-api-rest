import fastify from 'fastify';
import { knex } from './database';
import { env } from './env';

const app = fastify();

app.get('/hello', async () => {
  const transactinos = await knex('transactions').select('*')
  return 'Hello World'
});

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`server running on port ${env.PORT}`);
  });
