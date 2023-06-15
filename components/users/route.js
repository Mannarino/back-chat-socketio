var express = require ('express')
var controller = require('./controller')
var router = express.Router()
const createUserValidation= require('./../../middelwares/createUserValidation')






//crear usuario
router.post('/',createUserValidation, async (req,res)=>{
	const RespuestaDataYToken = await controller.crearUser(req,res)
	res.send(RespuestaDataYToken)
})



//verifyToken,verifyMembresia('gold'),
router.put('/',async (req,res)=>{
    const userUpdated = await  controller.updateUser(req,res)	
})



module.exports= router