import 'dotenv/config'
import knexSetup, { Knex } from 'knex';

if (!process.env.DATABASE_URL) {
  throw new Error('Database env not found');
}

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: process.env.DATABASE_URL
  },
  migrations: {
    extension: 'ts',
    directory: './db/migrations'
  },
  useNullAsDefault: true
}

export const knex = knexSetup(config);