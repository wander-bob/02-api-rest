import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import supertest from 'supertest';

import { app } from '../src/app';

describe('Transactions routes', () => {
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

	it('should be able to list all transactions', async () => {
		const createdTransactions = await supertest(app.server).post('/transactions')
			.send({
				title: 'New test transactions',
				amount: 1000,
				type: 'credit'
			});

		const cookies = createdTransactions.get('Set-Cookie');

		const listOfTransactions = await supertest(app.server)
			.get('/transactions')
			.set('Cookie', cookies!)
			.expect(200);

		expect(listOfTransactions.body.transactions).toEqual([
			expect.objectContaining({
				title: 'New test transactions',
				amount: 1000,
			})
		])
	})
})