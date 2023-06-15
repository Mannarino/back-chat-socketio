const mongoose = require('mongoose')

var userSchema=  mongoose.Schema({
	nombre: {
		type: String,
	    required: true,
        unique: true
	  },
	email: {
	    type: String,
	    required: true,
	    unique: true // aquí se especifica que el campo debe ser único
	  },
	password :{
		type: String,
	    required: true
	  },
	urlImagen :{
		type: String,
	    default:''
	  },
	 sexo :{
		type: String,
	    required: true
	  }
})

var modelUsers = mongoose.model('user',userSchema)

module.exports = modelUsers