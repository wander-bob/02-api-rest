import { describe, it, beforeAll, afterAll } from 'vitest';
import supertest from 'supertest';

import { app } from '../src/app';

describe('Transactions route', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to register a transaction', async () => {
		await supertest(app.server).post('/transactions')
			.send({
				title: 'New transaction',
				amount: 1000,
				type: 'credit'
			}).expect(201);
	});
})