
const routerUsers = require('./components/users/route.js')
const verificarToken = require('./consultar-token')

function routes(app) {
	
    app.use('/users', routerUsers)
    app.use('/consultar-token', verificarToken)
}

module.exports = routes