const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },

  host: 'localhost:3000',
  security: [{"apiKeyAuth": []}],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header', // can be 'header', 'query' or 'cookie'
      name: 'authorization', // name of the header, query parameter or cookie
      description: 'Token de Autenticação'
    }
  },
  definitions: {
    User: {
        name: "User",
        gender: "Male",
        birthDate: "2000-01-01",
        cpf: "12345678900",
        phone: "12345678900",
        email: "user@example.com",
        password: "User10",
        cep: "12.345-678",
        address: "Rua Exemplo, 123",
        addressNumber: "123",
        addressComplement: "Apto 123",
        role: "user"
    },
    Attraction: {
        name: "Nome da atração",
        description: "Descrição da atração",
        visitDate: "2024-05-08",
        cep: "12345-678",
        address: "Rua Exemplo, 123",
        addressNumber: 123,
        latitude: -23.5505,
        longitude: -46.6333,
        geoLocality: "Localidade geográfica",
        attractionCategory: "natural",
        visibility: "private",
        adventureLevel: "Radical",
        cost: "Gratuito",
        rate: "10",
        accessibility: true,
        selectiveWasteCollection: true,
        user_id: 2
    }
}
};

const outputFile = './src/routes/swagger.json';
const routes = ['./src/server.js'];

swaggerAutogen(outputFile, routes, doc);