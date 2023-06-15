const mongoose = require('mongoose')

const obtenerValoresDeEntorno = require('./environment/getEnvironment.js')
const config =obtenerValoresDeEntorno()

module.exports= function db(){
	mongoose.connect(`mongodb+srv://${config.USER_DATABASE}:${config.PASSWORD_DATABASE}@cluster0.xyktkfp.mongodb.net/${config.NAME_DATABASE}?retryWrites=true&w=majority`,
	function(){console.log('conectado a base de datosss')})
}
