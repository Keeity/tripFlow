const {Router, query} = require('express');
const { auth } = require('../middleware/auth');
const UserController = require('../controllers/UserController');
const role = require('../middlewares/role');

const userRoutes = new Router; 

//usuario - cadastro
userRoutes.post('/', UserController.register)

//usuario - listar todos
userRoutes.get('/', auth, isAdmin, UserController.list)

//usuario - listar por id
userRoutes.get('/:id', auth, isAdmin, UserController.listById)

//usuario - alterar o próprio cadastro
userRoutes.put('/:id', auth, UserController.update)

//usuario - alterar o próprio cadastro parcialmente
userRoutes.patch('/:id', UserController.partialUpdate);

//usuario - excluir o próprio cadastro
userRoutes.delete('/:id', UserController.delete)  

module.exports = userRoutes 