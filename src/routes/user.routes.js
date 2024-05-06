const {Router, query} = require('express');
const { auth } = require('../middlewares/auth');
const UserController = require('../controllers/UserController');
const role = require('../middlewares/role');

const userRoutes = new Router; 

//usuario - Fazer Login
userRoutes.post('/login', UserController.login)

//usuario - cadastro
userRoutes.post('/', UserController.register)

//usuario - alterar o próprio cadastro
userRoutes.put('/:id', auth, UserController.update)
//próprio

//usuario - excluir o próprio cadastro
userRoutes.delete('/:id', auth, UserController.delete) 

//usuario - listar todos - admin
userRoutes.get('/', auth, UserController.list)

//usuario - listar por id - admin
userRoutes.get('/:id', auth, role.isAdmin, UserController.listById)

//usuario - listar por busca
userRoutes.get('/filter', auth, role.isAdmin, UserController.listByFilter)

//usuario - alterar qualquer cadastro - admin
userRoutes.put('/admin/:id', auth, role.isAdmin, UserController.adminUpdate)

//usuario - excluir qualquer cadastro - admin
userRoutes.delete('/admin/:id', role.isAdmin, UserController.adminDelete) 

module.exports = userRoutes 