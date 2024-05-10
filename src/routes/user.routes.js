const {Router, query} = require('express');
const { auth } = require('../middlewares/auth');
const UserController = require('../controllers/UserController');
const { checkRole } = require('../middlewares/role');
const { userSchema } = require('../schemas/user.schema');
const yup = require('../middlewares/yup');
const { updateUserSchema } = require('../schemas/updateUser.schema');

const userRoutes = new Router; 

//usuario - Fazer Login
userRoutes.post('/login', UserController.login)

//usuario - cadastro de usuário (user)
userRoutes.post('/', yup(userSchema), UserController.userRegister)

//usuario - alterar o próprio cadastro
userRoutes.put('/', auth, yup(updateUserSchema),UserController.userUpdate)

//usuario - ver seu próprio cadastro
userRoutes.get('/', auth, UserController.viewRegister)

//usuario - reativar cadastro excluído
userRoutes.put('/reactivate', yup(updateUserSchema), UserController.reactivate)

//usuario - excluir o próprio cadastro
userRoutes.delete('/', auth, UserController.userDelete) 

//usuario - listar todos - admin
userRoutes.get('/admin', auth, checkRole('admin'), UserController.usersList)

//usuario - listar por id - admin
userRoutes.get('/admin/:id', auth, checkRole('admin'), UserController.listUsersById)

//usuario - alterar qualquer cadastro - admin
userRoutes.put('/admin/:id', auth, checkRole('admin'), yup(updateUserSchema), UserController.update)

//usuario - excluir qualquer cadastro - admin
userRoutes.delete('/admin/:id', auth, checkRole('admin'), UserController.usersDelete) 

module.exports = userRoutes 
