//acesso administrador

const {Router, query} = require('express');
const { auth } = require('../middleware/auth');
const AdminController = require('../controllers/AdminController');
const role = require('../middlewares/role');

const adminRoutes = new Router; 


//admin - cadastro de atração - apenas Admin
adminRoutes.post('/local',auth, role.isAdmin, AdminController.register)
//definir que será sempre pública quando o usuário for admin

//admin - listar todas as atrações
adminRoutes.get('/', auth, role.isAdmin, AdminController.list)

//admin - listar atração por id
adminRoutes.get('/:id', auth, role.isAdmin, AdminController.listById)

//admin - alterar qualquer atração cadastrada
adminRoutes.put('/:id', auth, role.isAdmin, AdminController.update)

//admin - excluir qualquer atração cadastrada
adminRoutes.delete('/:id', auth, role.isAdmin, AdminController.delete)  

module.exports = adminRoutes 