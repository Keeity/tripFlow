const { Router } = require("express");
const routes = Router()
const userRoutes = require("./user.routes");
const loginRoutes = require("./login.routes");
const adminRoutes = require("./admin.routes");
const attractionRoutes = require("./attraction.routes");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../controllers/swagger.json');



routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
routes.use('/usuario', userRoutes) 
routes.use('/local', attractionRoutes)
routes.use('/admin', adminRoutes)
routes.use('/login', loginRoutes) 


module.exports = routes