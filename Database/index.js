'use strict'

const mongoose = require('mongoose')
const config = require('@camp/config')
const { getLogger, terminate } = require('@camp/utils')

const User = require('./models/user')


const log = getLogger(__dirname, __filename)

if (!config.db) {
  log.error('please set MONGODB_URL env variable')
  process.exit(1)
}

mongoose.connect(config.db)
mongoose.connection.on('error', terminate(1, 'dbError'))
mongoose.connection.once('open', () => {
  log.info('db connected')
})

module.exports = {
  User
}
