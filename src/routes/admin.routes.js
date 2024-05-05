//Rotas para as atrações Públicas - que são aquelas acessíveis apenas pelos usuários premium e admin e podem ser criadas pelo admin apenas


const {Router, query} = require('express');
const { auth } = require('../middleware/auth');
const AdminController = require('../controllers/AdminController');
const role = require('../middlewares/role');

const adminRoutes = new Router; 

//depois ver se precisa
//admin - cadastro de atração pública - apenas Admin
adminRoutes.post('/',auth, role.isAdmin, AdminController.register)

//admin - listar todas as atrações
adminRoutes.get('/', auth, role.isAdmin, AdminController.list)

//admin - listar atração por id
adminRoutes.get('/:id', auth, role.isAdmin, AdminController.listById)

//admin - alterar qualquer atração cadastrada
adminRoutes.put('/:id', auth, role.isAdmin, AdminController.update)

//admin - excluir qualquer atração cadastrada
adminRoutes.delete('/admin/:id', auth, role.isAdmin, AdminController.delete)  

module.exports = adminRoutes 