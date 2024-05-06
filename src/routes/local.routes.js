const {Router, query} = require('express');
const { auth } = require('../middlewares/auth');
const LocalController = require('../controllers/LocalController');

const localRoutes = new Router; 

//local - cadastro de atração privada
localRoutes.post('/local',auth, LocalController.register)
//colocar automático o user_id

//local - listar todas as atrações privadas criadas pelo usuario
localRoutes.get('/local', auth, LocalController.list)
//criar condição que tem que ser criada por si.

//local - listar atração privada por id se criada pelo usuario
localRoutes.get('/local/:id', auth, LocalController.listById)
//apenas criadas por si

//local - alterar a própria atração cadastrada
localRoutes.put('/local/:id', auth, LocalController.update)
// apenas rotas criadas por si.

//local - excluir a própria atração privada cadastrada
localRoutes.delete('/local/:id', auth, LocalController.delete)  
// apenas rotas criadas por si.

module.exports = localRoutes 