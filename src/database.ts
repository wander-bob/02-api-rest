import knexSetup, { Knex } from 'knex';
import { env } from './env/'

const DATABASE_CONNECTION = env.DATABASE_CLIENT === "sqlite" ? {
  filename: env.DATABASE_URL
} : env.DATABASE_URL;

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: DATABASE_CONNECTION,
  migrations: {
    extension: 'ts',
    directory: './db/migrations'
  },
  useNullAsDefault: true
}

export const knex = knexSetup(config);