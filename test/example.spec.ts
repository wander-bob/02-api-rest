import { test, expect, beforeAll, afterAll } from 'vitest';
import supertest from 'supertest';

import { app } from '../src/app';

beforeAll(async () => {
	await app.ready()
});
afterAll(async () => {
	await app.close();
});

test('O usuário deve conseguir criar uma nova transação', async () => {

	await supertest(app.server).post('/transactions')
		.send({
			title: 'New Transaction',
			amount: 5000,
			type: 'credit',
		}).expect(201)
});
