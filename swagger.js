const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        version: "1.0.0",
        title: "# Turismo Interativo e Sustentável\n\nTrip Flow",

        description: "Documentação da Trip Flow"
    },
    host: "localhost:3000",
    security: [{ "apiKeyAuth": [] }],
    securityDefinitions: {
        apiKeyAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'authorization',
            description: 'Token de Autenticação'
        }
    }

};

const outputFile = './src/routes/swagger.json';
const routes = ['./src/server.js'];

swaggerAutogen(outputFile, routes, doc);