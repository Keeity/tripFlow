const {Router, query} = require('express');
const { auth } = require('../middleware/auth');
const AttractionController = require('../controllers/AttractionController');
const role = require('../middlewares/role');

const attractionRoutes = new Router; 

//attraction - Cadastrar atração pública 
attractionRoutes.post('/',auth, role.isAdmin, AttractionController.register)

//attraction - listar todas as atrações cadastradas
attractionRoutes.get('/', auth, role.isPremiumOrAdmin, AttractionController.list)

//attraction - listar atrações cadastradas em busca por nome
attractionRoutes.get('/busca', auth, role.isPremiumOrAdmin, AttractionController.list)

//attraction - listar atrações por id
attractionRoutes.get('/:id', auth, role.isPremiumOrAdmin, AttractionController.list)

//attraction - alterar qualquer atração
attractionRoutes.put('/:id', auth, role.isAdmin, AttractionController.update)

//attraction - excluir qualquer atração
attractionRoutes.delete('/:id', auth,role.isAdmin, AttractionController.delete)  

module.exports = attractionRoutes 