const {Router} = require('express');
const loginRoutes = new Router; 
const { auth } = require('../middleware/auth');
const LoginController = require('../controllers/LoginController')
 
//login - Fazer Login
loginRoutes.post('/', LoginController.login)

//login - alterar senha 
loginRoutes.put('/alterarsenha', auth, LoginController.alterarSenha)

module.exports = loginRoutes  //exporta 
// é o mesmo que: export default routes