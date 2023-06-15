var express = require ('express')
const jwt = require('jsonwebtoken')
const obtenerValoresDeEntorno = require('./environment/getEnvironment.js')
const config =obtenerValoresDeEntorno()
var router = express.Router()



//verifyToken,verifyMembresia('gold'),
router.post('/',async (req,res)=>{
	try {
		const head = req.headers.authorization || req.headers.Authorization
		if(!head){
			return res.status(401).send({message:'no enviaste autorization'})
		}
		const token = head.split(" ")[1]
		const tokenValido = jwt.verify(token,config.KEY_SECRET_TOKEN)
		
		res.send(tokenValido)
	}
	catch(error){

		 // Si el token ha expirado, maneja la excepción correspondiente
		  if (error.name === 'TokenExpiredError') {
		    console.log('El token ha expirado');
		    return res.status(401).send({tokenValido:false})
		  } else {
		    return res.status(401).send({tokenValido:false})
		  }
		console.log('se rechazo el token')
		return res.status(401).send({tokenValido:false})
	}
})



module.exports= router