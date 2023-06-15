const jwt = require('jsonwebtoken')
const obtenerValoresDeEntorno = require('./environment/getEnvironment.js')
const config =obtenerValoresDeEntorno()
const modelo = require('./components/users/model.js')
const bcrypt = require('bcrypt')
function chat(io){
	//obtengo los usuarios registrados e ingreso sus nombres a la lista de nombres no disponibles
	 async function obtenerUsuariosRegistrados() {
	  let usuariosRegistrados = await modelo.find({});
	  usuariosRegistrados.forEach((usuario) => {
	    nombresUsuariosNoDisponibles.push(usuario.nombre);
	  });
	 }
     obtenerUsuariosRegistrados()
    
    //declaro variables
	 let nombresUsuariosNoDisponibles = []
     let usuariosConectados = []

     //escucho coneccion
     io.on('connection', (socket) => {
	  console.log('a user connected',socket.id);
	 

	 //inicio de sesion sin registro 
     socket.on('iniciarSinRegistro', (usuario,disponibilidad) => {
       const usuarioYaIngresado = nombresUsuariosNoDisponibles.indexOf(usuario.nombre);
       if(usuarioYaIngresado !== -1){	
	    	 disponibilidad(false)
       }else{
         	socket.nickname = usuario.nombre
	    	nombresUsuariosNoDisponibles.push(socket.nickname)
	    	usuariosConectados.push({nombre:socket.nickname,urlImagen:usuario.urlImagen})
	    	disponibilidad(true)
		    }
	 });

      //inicio de sesion con registro (login)
      socket.on('login', async (usuario,respuesta) => {
      	const {email,password} = usuario

      	//verificar envio de campos correctos
      	if(!email){
			respuesta({error:" no enviaste el mail"})
		}
		if( !/\S+@\S+\.\S+/.test(email)){
			respuesta({error:" no es un email"})
		}
		if(!password){
			respuesta({error:" no enviaste password"})
		}

		//verificar email
		const user = await modelo.findOne({email:email})
		if (!user) {
			respuesta({error:'usuario no encontrado'})
		}

		//verificar password
	    const isMatch = await bcrypt.compare(password,user.password)
	    if (!isMatch) {
			respuesta({error:'pass invalid'})
		}

        // Verificar si el usuario ya está conectado
        const usuarioYaConectado = usuariosConectados.some((usuario) => usuario.nombre === user.nombre);
        if (usuarioYaConectado) {
          respuesta({ error: 'El usuario ya está conectado' });
          return;
        }
        
		//generar token
		const payload = {
        		nombre: user.nombre
			}
		const token = jwt.sign(payload,config.KEY_SECRET_TOKEN,{expiresIn:'3h'})

		socket.nickname = user.nombre
		const profile ={
			nombre:user.nombre,
			sexo:user.sexo,
			urlImagen:user.urlImagen,
			_id:user._id
		}
	    usuariosConectados.push({nombre:socket.nickname,urlImagen:user.urlImagen})
		respuesta({acceso:true,token,profile})
       
	  });


      //obtener lista de usuarios conectados
      socket.on('obtenerUsuariosConectados', () => {   
	   actualizarUsuarios() 
	  });

       //recibir mensaje del cliente y enviarlo a todos
      socket.on('messageDelCliente', (message) => {  
	    io.emit('messageDelServer',message) 
	  });

	  socket.on('disconnect', () => {
	    console.log('a user  disconnected!!.');
	      // Eliminar el usuario de usuariosConectados
		  const indiceConectados =usuariosConectados.findIndex(objeto => objeto.nombre === socket.nickname);
		  if (indiceConectados > -1) {
		    usuariosConectados.splice(indiceConectados, 1);
		  }

		  // Eliminar el usuario de nombresUsuariosNoDisponibles
		  const indiceNoDisponibles = nombresUsuariosNoDisponibles.indexOf(socket.nickname);
		  if (indiceNoDisponibles > -1) {
		    nombresUsuariosNoDisponibles.splice(indiceNoDisponibles, 1);
		  }
	    actualizarUsuarios()
	  });
	});

	
	function actualizarUsuarios(){
		// Emitir la lista de usuarios conectados al cliente (numero y nombres)
	    io.emit('usuariosConectados',
	    	{usuariosConectados} );
	}
}

module.exports = chat