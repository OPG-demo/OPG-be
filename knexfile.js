// Update with your config settings.
const fs = require('fs')
require('dotenv').config()

module.exports = {

  development: {
    client: 'pg',
    connection: {
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
      ssl: {
        rejectUnauthorized: false,
        ca: fs.readFileSync('cacert.crt').toString()
      }
    },
    migrations: {
      directory: '/data/migrations',
    }
  },


  production: {
    client: 'pg',
    connection: {
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
      ssl: {
        rejectUnauthorized: false,
        ca: fs.readFileSync('cacert.crt').toString()
      }
    },
    migrations: {
      directory: '/data/migrations',
    }
  }

};
