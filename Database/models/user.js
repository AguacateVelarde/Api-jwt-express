'use strict'
const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')
var unique = require( 'mongoose-unique-validator')

var Roles = {
   values : [
     'ADMIN_ROLE',
     'USER_ROLE',
     'CALL'
   ],
   message : '{VALUE} no es un rol permitido'
}


const schema = new Schema({
  nombre: {
    type: String,
    required: [ true, 'Se necesita un Nombre' ]
  },
  apellidoPaterno: {
    type: String,
    required: [ true, 'Se necesita un Apellido Paterno']
  },
  apellidoMaterno: {
    type: String,
    required: [ true, 'Se necesita un Apellido Materno']
  },
  password: {
    type: String,
    select: false,
    required: [ true, 'Se necesita una Contraseña']
  },
  imgProfile: {
    type: String,
    required: false
  },
  email: {
    type: String,
    unique: true,
    required: [ true, 'Se necesita un Correo electrónico']
  },
  role: {
    type: String,
    required: [ true, 'Se necesita un Role'],
    default : 'USER_ROLE',
    enum: Roles
  },
  dateRegister :{
    type: Date,
    default : Date.now()
  },
  lastDate : {
    type: Date
  }
})

schema.pre('save', function(next){
  let user = this
  if( !user.isModified('password') ) return next()
  user.password = bcrypt.hashSync(user.password, 10)
  next()
})

schema.plugin( unique, { message : "El correo debe ser único"} )


if (!schema.options.toObject) {
  schema.options.toObject = {}
}

schema.options.toObject.transform = (doc, ret, options) => {
  // delete version
  delete ret.__v
  return ret
}
module.exports = mongoose.model('Users', schema)
