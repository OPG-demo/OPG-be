const knex = require('knex')
const config = require('../knexfile')
const { type } = require('os')

const types = require('pg').types
types.setTypeParser(1082, val => val)

const dbEnv = process.env.DB_ENV || 'development'

module.exports = knex(config[dbEnv])