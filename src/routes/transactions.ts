import { randomUUID } from "node:crypto";
import { FastifyInstance } from "fastify";
import { z } from 'zod';

import { knex } from "../database";

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const transactions = await knex('transactions').select('*');
    return { transactions }
  })

  app.get('/:id', async (request) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getTransactionParamsSchema.parse(request.params);

    const transaction = await knex('transactions').where('id', id).first();

    return {
      transaction
    }
  })

  app.get('/summary', async () => {
    const summary = await knex('transactions').sum('amount', { as: 'amount' }).first();
    return { summary }
  })

  app.post('/', async (request, repy) => {
    const createTransactionBodySchema = z.object({
      title: z.string().min(3),
      amount: z.coerce.number().min(1),
      type: z.enum(['credit', 'debit'])
    });

    const { title, amount, type } = createTransactionBodySchema.parse(request.body);

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
    })

    return repy.status(201).send();
  })

}