import knexSetup, { Knex } from 'knex';

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: './db/app.db'
  },
  migrations: {
    extension: 'ts',
    directory: './db/migrations'
  },
  useNullAsDefault: true
}

export const knex = knexSetup(config);