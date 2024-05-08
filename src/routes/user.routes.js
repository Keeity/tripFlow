const {Router, query} = require('express');
const { auth } = require('../middlewares/auth');
const UserController = require('../controllers/UserController');
const { checkRole } = require('../middlewares/role');
const { userSchema } = require('../schemas/user.schema');
const yup = require('../middlewares/yup');


const userRoutes = new Router; 

//usuario - Fazer Login
userRoutes.post('/login', UserController.login)

//usuario - cadastro
userRoutes.post('/', yup(userSchema), UserController.userRegister)

//usuario - alterar o próprio cadastro
userRoutes.put('/', auth, UserController.userUpdate)

//usuario - ver seu próprio cadastro
userRoutes.get('/admin', auth, UserController.viewRegister)

//usuario - reativar cadastro excluído
userRoutes.put('/reactivate', UserController.reactivate)

//usuario - excluir o próprio cadastro
userRoutes.delete('/', auth, UserController.userDelete) 

//usuario - listar todos - admin
userRoutes.get('/admin', auth, checkRole('admin'), UserController.usersList)

//usuario - listar por id - admin
userRoutes.get('/admin:id', auth, checkRole('admin'), UserController.listUsersById)

//usuario - listar por busca
// userRoutes.get('/filter', auth, checkRole('admin'), UserController.listByFilter)

//usuario - alterar qualquer cadastro - admin
userRoutes.put('/admin/:id', auth, checkRole('admin'), UserController.update)

//usuario - excluir qualquer cadastro - admin
userRoutes.delete('/admin/:id', auth, checkRole('admin'), UserController.usersDelete) 

module.exports = userRoutes 
