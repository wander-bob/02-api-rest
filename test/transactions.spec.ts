import { describe, it, beforeAll, afterAll, expect, beforeEach } from 'vitest';
import supertest from 'supertest';
import { execSync } from 'node:child_process';

import { app } from '../src/app';

describe('Transactions routes', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	beforeEach(() => {
		execSync('npm run knex migrate:rollback --all');
		execSync('npm run knex migrate:latest');
	})

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
	});

	it('should be able to list a specific transaction', async () => {
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

		const transactionId = listOfTransactions.body.transactions[0].id;
		const transaction = await supertest(app.server)
			.get(`/transactions/${transactionId}`)
			.set('Cookie', cookies!)
			.expect(200);

		expect(transaction.body.transaction).toEqual(
			expect.objectContaining(
				{
					title: 'New test transactions',
					amount: 1000,
				})
		)
	});

	it.only('should be able to get transactions summary', async () => {
		const createdTransactions = await supertest(app.server).post('/transactions')
			.send({
				title: 'New test transactions',
				amount: 2000,
				type: 'credit'
			});

		const cookies = createdTransactions.get('Set-Cookie');

		await supertest(app.server)
			.post('/transactions')
			.set('Cookie', cookies!)
			.send({
				title: 'New test transactions',
				amount: 500,
				type: 'debit'
			}).expect(201);

		const transactionsSummary = await supertest(app.server)
			.get('/transactions/summary')
			.set('Cookie', cookies!)
			.expect(200);

		expect(transactionsSummary.body.summary).toEqual(
			expect.objectContaining(
				{
					amount: 1500,
				})
		)
	});
})