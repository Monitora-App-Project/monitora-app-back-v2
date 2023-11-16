require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
  migrations: {
    directory: './src/database/migrations'
  },
  useNullAsDefault: true,
  },

  test: {
    client: 'mysql',
    connection: {
      host : '',
      port : '',
      user : '',
      password : '',
      database : '',
    },
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
