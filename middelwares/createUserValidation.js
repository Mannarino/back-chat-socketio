const modelo = require('./../components/users/model.js')

async function createUserValid(req,res,next){
	try{
		const {nombre,email,password} = req.body
		if(!nombre){
			return res.status(400).send({ok:false,msg:" no enviaste nombre"})
			// agrego los return para evitar el problema de "can't set headers after they are send to the client"
		}
		if(!email){
			return res.status(400).send({ok:false,msg:" no enviaste email"})
		}
		if( !/\S+@\S+\.\S+/.test(email)){
			return res.status(400).send({ok:false,msg:" noes un email"})
		}
		if(!password){
			return res.status(400).send({ok:false,msg:" no enviaste un password"})
		}
		const usuarioNombre = await modelo.findOne({nombre})
		if (usuarioNombre) {
			return res.status(400).send({ok:false,msg:"el nombre ya esta en uso"})
		}
		const userEmail = await modelo.findOne({email:email})
		if (userEmail) {
			return res.status(400).send({ok:false,msg:"el mail ya esta en uso"})
		}
		
		next()
		}
	catch(err){
		console.log("error en el validador de crear usuario",err)
		return res.status(500).send({ok:false,msg:"error interno del servidor"})
	}
}

module.exports = createUserValid