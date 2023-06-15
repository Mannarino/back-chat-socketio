const modelo = require('./model.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helpers = require('./helpers')
const obtenerValoresDeEntorno = require('./../../environment/getEnvironment.js')
const config =obtenerValoresDeEntorno()
const usersCtrl = {}

usersCtrl.crearUser = async (req,res)=>{
	try{
		const nombre = req.body.nombre
		const email = req.body.email
		const password = req.body.password
		const sexo=req.body.sexo
		const nombreImagen=helpers.procesarImagen(req,res)
		
		//hastear contraseña
		const hashedPassword = await bcrypt.hash(password,11)

		//crear usuario
		const user = await modelo.create({
			nombre,
	    	email,
	    	password : hashedPassword,
	    	urlImagen:nombreImagen,
	    	sexo
		})
	
		return res.status(201).send({ok:true,msg:"usuario creado"})
	}
	catch(error){
		console.log(error)
		return res.status(500).send({message:'error interno del servidor'})
	}
}




usersCtrl.updateUser = async (req,res)=>{
	try{
		const nombre = req.body.nombre
		const nombreImagen=helpers.procesarImagen(req,res)
	
		// Actualizar usuario
	    const user = await modelo.findOneAndUpdate(
	      { nombre: nombre },
	      { $set: { urlImagen: nombreImagen } }
	    );

	    console.log(user);
	    // Aquí puedes realizar cualquier acción adicional con el usuario actualizado

	    return res.status(200).send({ message: 'Usuario actualizado',nombre,nuevaImagen:user.urlImagen });
	  } catch (error) {
	    console.log(error);
	    return res.status(500).send({ message: 'Error interno del servidor' });
	  }

}

module.exports = usersCtrl