'use strict'
const jwt = require('jsonwebtoken')
const SEED = require('@camp/config').SEED

var generateToken = function ( user ){
  var token = jwt.sign( {
    Nombre: user.nombre + ' ' + user.apellidoPaterno + ' ' + user.apellidoMaterno,
    Role: user.role
  }, SEED, { expiresIn : 14400 } )
  return token
}

var verifyToken = function ( req, res, next ){
  if( !req.headers.authorization ){
    return res.status(501).json({
      estatus : "Bad",
      message : "Sin autorización"
    })
  }
  var token = req.headers.authorization.split(' ')[1]
  jwt.verify( token, SEED, (err, payload)=>{
    if( err )
      return res.status(500).json({
        estatus : "Error",
        message : err
      })
      req.payload = payload
      next()
  })


}

var verifyTokenAdmin = function ( req, res, next ){
  if( !req.headers.authorization ){
    return res.status(501).json({
      estatus : "Bad",
      message : "Sin autorización_"
    })
  }
  var token = req.headers.authorization.split(' ')[1]

jwt.verify( token, SEED, (err, payload)=>{
  if( err )
    return res.status(500).json({
      estatus : "Error",
      message : err
    })

  if( payload.Role != 'ADMIN_ROLE' )
    return res.status(501).json({
      estatus : "Bad",
      message : "Sin autorización"
    })
    req.payload = payload
    next()
})

}

module.exports = {
  generateToken,
  verifyToken,
  verifyTokenAdmin
}
