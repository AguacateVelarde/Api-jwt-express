'use strict'
const http = require('http')
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const bodyParser = require('body-parser')
const { getLogger, logHandler, terminate } = require('@camp/utils')

const app = express()
const server = http.createServer(app)
const log = getLogger(__dirname, __filename)
const port = +process.env.PORT || 8000

const { user, home, auth } = require('@camp/api')
app.use(helmet())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logHandler)
app.use( '/token', auth )
app.use( '/user', user )

module.exports = server

if (!module.parent) {
  server.listen(port, () => {
    log.info(`server listening on http://localhost:${port}`)
  })

  process.on('SIGINT', terminate(0, 'SIGINT'))
  process.on('SIGTERM', terminate(0, 'SIGTERM'))
  process.on('uncaughtException', terminate(1, 'uncaughtException'))
  process.on('unhandledRejection', terminate(1, 'unhandledRejection'))
}
