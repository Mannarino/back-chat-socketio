   function getEnvironment(){
   		try{
        const config = require('./config')
        if(config){
           console.log('entorno local')
        }
      return config
   	}
   		catch{
   			console.log(' entorno de produccion con las variables de entorno pasadas en produccion')
   			const config = require('./configToDeploy')
        return config
   	}
   }

   module.exports = getEnvironment

   /* explicacion de este modulo

   en la carpeta environmentse pondran dos archivos cada uno tendra un objeto con propiedades
   y valores de entorno, es importante que en ambos objetos de lso dos archivoslas propiedades
   se llamen de la misma manera, ya que luego en el codigo cuando se haga referencia
   a esaspropeidadesse usaran esos nombres de las propiedades.
   Luegoen el modulo getEnvironment cro una funcion que en un bloqueTryCatch
   intenta en el primero importar el archivo config, este archivo se ignorara
   en el gitnoinore por lo que cuando se suba a git no se subira, o sea que no estara
   en produccion, cuando se intenta accedera este archivo dara false por lo que se pasara al catch 
    es improtante notar que en ese archivo config estaran lso valores quemados, o sea losvalores
    que se usaran en el entorno de desarrollo, cuando se pasa al catch se buscara improtar otro archivo
    que este si estara en el entornode desarrollo y simplemente tiene el mismo objeto con las mismas
    propiedades pero los valores de estas propiedades son variablesde entornos que se pasaran cuando 
    el entorno de produccion pida esos valores */