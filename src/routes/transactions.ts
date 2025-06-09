import { randomUUID } from "node:crypto";
import { FastifyInstance } from "fastify";
import { z } from 'zod';

import { checkSessionId } from '../middlewares/check-session-id';
import { knex } from "../database";

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', { preHandler: [checkSessionId] }, async (request) => {
    const { sessionId } = request.cookies;

    const transactions = await knex('transactions')
      .where({
        session_id: sessionId
      })
      .select('*');
    return { transactions }
  })

  app.get('/:id', { preHandler: [checkSessionId] }, async (request) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getTransactionParamsSchema.parse(request.params);

    const { sessionId } = request.cookies;
    const transaction = await knex('transactions').where({
      id,
      session_id: sessionId,
    }).first();

    return {
      transaction
    }
  })

  app.get('/summary', { preHandler: [checkSessionId] }, async (request) => {
    const { sessionId } = request.cookies;
    const summary = await knex('transactions')
      .where({
        session_id: sessionId
      })
      .sum('amount', { as: 'amount' })
      .first();
    return { summary }
  })

  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string().min(3),
      amount: z.coerce.number().min(1),
      type: z.enum(['credit', 'debit'])
    });

    const { title, amount, type } = createTransactionBodySchema.parse(request.body);

    let sessionId = request.cookies.sessionId;
    if (!sessionId) {
      sessionId = randomUUID();

      const sevenDaysCookieMaxAge = 60 * 60 * 24 * 7;
      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: sevenDaysCookieMaxAge,
      })
    }


    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return reply.status(201).send();
  })

}