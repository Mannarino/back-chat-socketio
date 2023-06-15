const { v4: uuidv4 } = require('uuid');
//este metodo guarda la imagen en un directorio de nuestro server
// hace validacioesn como de que venga un archivo, que sea de tal formato
// y retorna el nombre de la imagen
function procesarImagen(req,res) {
	    const file = req.files
	    //validar que venga un archivo
		if (!file|| Object.keys(file).length === 0) {
			return "imagen_por_defecto.jpg"
		  }

		  // Verificar el tamaño del archivo de 4mb
		  if (file.size > 4 * 1024 * 1024) {
		    return res.status(400).json({ message: 'El archivo excede el tamaño máximo permitido (4 MB)' });
		  }

		//validar extension
		const nombreCortado = file.image.name.split('.')
		const extensionArchivo = nombreCortado[nombreCortado.length - 1]
		const extensionesValidas = ['jpg','jpeg','png','gif']
		if(!extensionesValidas.includes(extensionArchivo)){
			return res.status(400).send({
				ok:false,
				msg:'No es un tipo de archivo valido'});
		}
		
		//generar el nombre del archivo
        const nombreArchivo = `${uuidv4()}.${extensionArchivo}`
		

		//path para guardar la imagen
		uploadPath = __dirname + '/../../uploads/' + nombreArchivo;
		//agrege los puntos suspensitvos en al ruta para escalar hasta el directorio
		//upload que se encuentra en la raiz del proyecto, ya que __dirname trae el directorio actual
	    //en el cual se esta ejecutando este archivo "el modulo este"	   
		
		//uso el metodo mv() para mover la iamgen a algun lugar dentro de mi server
		file.image.mv(uploadPath, function(err) {
			if (err)
			  return res.status(500).send( err);
		  });
		return nombreArchivo
}
function others(){

}
module.exports = {procesarImagen,
	              others}