const express = require('express')
const app = express()
const cors = require('cors');
const chatSocketIo = require('./chatSocketIo')
app.use(cors());
//movi la aplciacion del cors hasta aca arriba porque sino me daba error de cors si la ponia despues del httpserver
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});
const DBconection = require('./db.js')
const routes = require('./routers.js')

const path = require('path');

// configuracion fileUpload------
const fileUpload = require('express-fileupload');
// Configuración de límites de tamaño de archivo
app.use(fileUpload({
  limits: { fileSize: 4 * 1024 * 1024 } // 4 MB
}));

// configuracion fileUpload------ fin



//configuracion para servir archivos estaticos------
// Obtén la ruta absoluta de la carpeta de archivos estáticos
const uploadsPath = path.resolve(__dirname, 'uploads');
// Sirve archivos estáticos desde la ruta absoluta
app.use(express.static(uploadsPath));
//configuracion para servir archivos estaticos------fin 


app.use(express.json());

//conection base datos
DBconection()

//ruteo
routes(app)
chatSocketIo(io)





httpServer.listen(process.env.PORT || 3000, () => console.log(`listening on port ${process.env.PORT || 3000}`));