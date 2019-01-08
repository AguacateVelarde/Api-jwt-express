'use strict'
const { Router } = require('express')
const { BadRequest } = require('@camp/errors')
const { getLogger, cache } = require('@camp/utils')
const { User } = require('@camp/db')
const bcrypt = require('bcrypt')
const { generateToken } = require( '@camp/services')

const log = getLogger(__dirname, __filename)
const router = new Router()

// Get a list of users
router.get('/', async function permissionGet (req, res, next) {
  res.status(501).json({
    estatus : "Permiso denegado!"
  })
})
// Login
router.post('/', async function genToken( req, res, next ){
  var body = req.body
  User.find({ email : body.email }).select('password nombre apellidoMaterno apellidoPaterno role')
  .exec((err, user)=>{
    if( err )
      return res.status(500).json({
        estatus : 'Bad',
        message: err
      })
    if( !user )
      return res.status(404).json({
        estatus : 'Bad',
        message: 'No existe el usuario'
      })
    if( !bcrypt.compareSync( body.password, user[0].password ))
      return res.status(404).json({
        estatus : 'Bad',
        message: 'Error con la contraseña'
      })

    res.status(200).json({
        estatus : 'Ok',
        message : '',
        token : generateToken( user[0] )
    })

  })

})
module.exports = router
