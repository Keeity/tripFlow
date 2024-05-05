
// const { isAdmin, isUser, isPremiumOrAdmin } = require('./roleMiddleware');


// router.post('/local', isAdmin, (req, res) => {
//     // completar depois
// });

// router.post('/attraction', isAdmin, (req, res) => {
//     // completar depois
// });

// router.get('/attractions', isPremiumOrAdmin, (req, res) => {
//     // Lógica para premiumUser ver todas as Attractions
// });

// router.get('/my-attractions', isUser, (req, res) => {
//     // Lógica para user ver suas próprias Attractions
// });

const {Router, query} = require('express');
const { auth } = require('../middleware/auth');
const LocalController = require('../controllers/LocalController');
const role = require('../middlewares/role');

const localRoutes = new Router; 

//local - cadastro de atração privada
localRoutes.post('/',auth, LocalController.register)
//criar condição que tem que ser privada.

//local - listar todas as atrações privadas criadas pelo usuario
localRoutes.get('/', auth, LocalController.list)

//local - listar qualquer atração privada
localRoutes.get('/admin', auth, role.isAdmin, LocalController.delete)  
//comdição rota privada

//local - listar atração privada por id se criada pelo usuario
localRoutes.get('/:id', auth, LocalController.listById)

//local - listar atração privada por id
localRoutes.get('/admin/:id', auth, role.isAdmin, LocalController.delete)  
//comdição rota privada

//local - alterar a própria atração privada cadastrada
localRoutes.put('/:id', auth, LocalController.update)
//attraction - alterar qualquer atração pública cadastrada

//local - alterar qualquer atração privada
localRoutes.put('/admin/:id', auth, role.isAdmin, LocalController.delete)  
//comdição rota privada

//local - alterar parcialmente a própria atração privada cadastrada
localRoutes.patch('/:id', auth, LocalController.partialUpdate);

//local - excluir a própria atração privada cadastrada
localRoutes.delete('/:id', auth, LocalController.delete)  

//local - excluir qualquer atração privada
localRoutes.delete('/admin/:id', auth, role.isAdmin, LocalController.delete)  
//comdição rota privada

module.exports = localRoutes 