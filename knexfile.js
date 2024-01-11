require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING_DEV,
  migrations: {
    directory: './src/database/migrations'
  },
  useNullAsDefault: true,
  },

  test: {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING_TEST,
  migrations: {
    directory: './src/database/migrations'
  },
  useNullAsDefault: true,
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
