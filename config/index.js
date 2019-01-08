'use strict'

const pkg = require('../package.json')
const config = {
  db: process.env.MONGODB_URL || 'mongodb://localhost:27017/camp',
  SEED : process.env.SEED  || 'fg7qi¢#urqiub4crfnwkjhv'
}
Object.assign(config, { pkg })
module.exports = config
