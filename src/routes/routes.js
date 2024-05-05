const { Router } = require("express");
const routes = Router()
const userRoutes = require("./user.routes");
const attractionRoutes = require("./attraction.routes");
const localRoutes = require("./local.routes");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../controllers/swagger.json');



routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
routes.use('/usuario', userRoutes) 
routes.use('/local', localRoutes)
routes.use('/attraction', attractionRoutes)
routes.use('/login', loginRoutes) 

module.exports = routes