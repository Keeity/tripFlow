const {Router, query} = require('express');
const { auth } = require('../middleware/auth');
const UserController = require('../controllers/UserController');
const role = require('../middlewares/role');

const userRoutes = new Router; 

//usuario - Fazer Login
userRoutes.post('/login', UserController.login)

//usuario - cadastro
userRoutes.post('/', UserController.register)

// //usuario - alterar senha 
// userRoutes.put('/alterarsenha', auth, UserController.alterarSenha)

//usuario - alterar o próprio cadastro
userRoutes.put('/:id', auth, UserController.update)
//próprio

//usuario - excluir o próprio cadastro
userRoutes.delete('/:id', UserController.delete) 

//usuario - listar todos - admin
userRoutes.get('/', auth, role.isAdmin, UserController.list)

//usuario - listar por id - admin
userRoutes.get('/:id', auth, role.isAdmin, UserController.listById)

//usuario - alterar qualquer cadastro - admin
userRoutes.put('/admin/:id', auth, role.isAdmin, UserController.update)

//usuario - excluir qualquer cadastro - admin
userRoutes.delete('/admin/:id', role.isAdmin, UserController.delete) 

module.exports = userRoutes 