const {Router, query} = require('express');
const { auth } = require('../middlewares/auth');
const AttractionController = require('../controllers/AttractionController');
const { checkRole } = require('../middlewares/role');
const { attractionSchema } = require('../schemas/attraction.schema');
const yup = require('../middlewares/yup');

const attractionRoutes = new Router; 

//attraction - Cadastrar atração pública 
attractionRoutes.post('/',auth, checkRole('admin'), AttractionController.register)

//attraction - listar todas as atrações cadastradas
attractionRoutes.get('/', auth, checkRole('admin', 'premium'), AttractionController.list)

//attraction - listar atrações cadastradas em busca por nome
attractionRoutes.get('/filter', auth, checkRole('admin', 'premium'), AttractionController.listByFilter)

//attraction - listar atrações por id
attractionRoutes.get('/:id', auth, checkRole('admin', 'premium'), AttractionController.listById)
 
//attraction - alterar qualquer atração
attractionRoutes.put('/:id', auth, checkRole('admin'), AttractionController.update)

//attraction - excluir qualquer atração
attractionRoutes.delete('/:id', auth, checkRole('admin'), AttractionController.delete)  

module.exports = attractionRoutes 