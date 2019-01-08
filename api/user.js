'use strict'

const { Router } = require('express')
const { BadRequest } = require('@camp/errors')
const { getLogger, cache } = require('@camp/utils')
const { User } = require('@camp/db')
const { verifyToken, verifyTokenAdmin } = require('@camp/services')

const log = getLogger(__dirname, __filename)
const router = new Router()

// Get a list of users
router.get('/', verifyTokenAdmin, async function getAllUsers (req, res, next) {
  User.find({})
  .exec((err, data)=>{
    if( err )
    return res.status(500).json({
      estatus : 'Bad',
      err
    })
    res.status(200).json({
      estatus : 'OK',
      data,
      payload : req.payload
    })
  })
})

// Login
router.get('/:id', TODO)

// Save a user & login
router.post('/', function postUser (req, res, next) {
  var body = req.body
  var user = new User({
    nombre : body.nombre,
    apellidoMaterno : body.apellidoPaterno,
    apellidoPaterno : body.apellidoMaterno,
    password : body.password,
    email : body.email
  })
  user.save( ( err, userSave )=>{
    if( err )
      return res.status(500).json({
        message : err,
        estatus : 'Bad',
      })
    res.status(200).json({
      estatus : 'OK',
      userSave
    })
  })

})

// Update a media object
router.put('/:id', TODO)

// Delete a media object
router.delete('/:id', TODO)

function TODO (req, res) {
  log.warn(`TODO implement: ${req.method} ${req.url}`)
  res.status(501).send('TODO')
}

module.exports = router
