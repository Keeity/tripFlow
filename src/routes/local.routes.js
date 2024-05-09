const {Router, query} = require('express');
const { auth } = require('../middlewares/auth');
const LocalController = require('../controllers/LocalController');
const { attractionSchema } = require('../schemas/attraction.schema');
const yup = require('../middlewares/yup');
const { updateAttractionSchema } = require('../schemas/updateAttraction.schema');
const localRoutes = new Router; 

//local - cadastro de atração privada
localRoutes.post('/',auth, yup(attractionSchema), LocalController.register)

//local - listar todas as atrações privadas criadas pelo usuario
localRoutes.get('/', auth, LocalController.list)

//local - listar atração privada por id se criada pelo usuario
localRoutes.get('/:id', auth, LocalController.listById)

//local - alterar a própria atração cadastrada
localRoutes.put('/:id', auth, yup(updateAttractionSchema),LocalController.update)

//local - excluir a própria atração privada cadastrada
localRoutes.delete('/:id', auth, LocalController.delete)  
// apenas rotas criadas por si.

module.exports = localRoutes 