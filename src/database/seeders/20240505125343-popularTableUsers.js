'use strict';
const { queryInterface, Sequelize } = require("sequelize");
const bcrypt = require('bcryptjs');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users',
    [
  {
    name: 'Keeity Braga Collodel',
    gender: 'Feminino',
    birthDate: new Date('1986-09-17'),
    cpf: '121.134.789-00',
    phone: '(48)92994321',
    email: 'keeity@example.com',
    password: bcrypt.hashSync('Keeity17', 8),
    cep: '88063-300',
    address: 'Avenida Campeche, Florianópolis, SC',
    addressNumber: 123,
    addressComplement: 'Apto 12',
    role: 'admin',
    createdAt: new Date('2024-05-05'),
    updatedAt: new Date('2024-05-05')
  },
  {     name: 'João Silva',
        gender: 'Masculino',
        birthDate: new Date('1956-09-18'),
        cpf: '123.456.789-00',
        phone: '(11) 98765-4321',
        email: 'joao.silva@example.com',
        password: bcrypt.hashSync('Joao18', 8),
        cep: '89253-000',
        address: 'José Emmendoerfer, Nova Brasília, Jaraguá do Sul, SC',
        addressNumber: 321,
        role: 'user',
        createdAt: new Date('2024-05-05'),
        updatedAt: new Date('2024-05-05')
      },

      {
        name: 'Maria Santos',
        gender: 'Feminino',
        birthDate: new Date('1980-01-19'),
        cpf: '987.654.321-00',
        phone: '(11) 12345-6789',
        email: 'maria.santos@example.com',
        password: bcrypt.hashSync('Maria19', 8),
        cep: '23450-789',
        address: 'Rua Santa Cruz da Conceição, Parque Belém, São Paulo, SP',
        addressNumber: 456,
        addressComplement: 'Apto 34',
        role: 'user',
        createdAt: new Date('2024-05-05'),
        updatedAt: new Date('2024-05-05')
      },
      {
        name: 'Carlos Oliveira',
        gender: 'Masculino',
        birthDate: new Date('1990-02-20'),
        cpf: '876.543.210-00',
        phone: '(11) 23456-7890',
        email: 'carlos.oliveira@example.com',
        password: bcrypt.hashSync('Carlos20', 8),
        cep: '334560-890',
        address: 'Rua Sete, Santa Cruz, Rio de Janeiro, RJ',
        addressNumber: 789,
        addressComplement: 'Apto 56',
        role: 'premiumUser',
        createdAt: new Date('2024-05-05'),
        updatedAt: new Date('2024-05-05')
      },
      {
        name: 'Anna Souza',
        gender: 'Feminino',
        birthDate: new Date('2000-03-21'),
        cpf: '765.432.109-00',
        phone: '(11) 34567-8901',
        email: 'anna.souza@example.com',
        password: bcrypt.hashSync('Anna21', 8),
        cep: '45678-901',
        address: 'Avenida das Nações Unidas, 11633, Brooklin Paulista, São Paulo, SP',
        addressNumber: 12,
        addressComplement: 'Apto 78',
        role: 'user',
        createdAt: new Date('2024-05-05'),
        updatedAt: new Date('2024-05-05')
      }

]
    )
  }
  }

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', {
      email: [
        'keeity@example.com',
        'joao.silva@example.com',
        'maria.santos@example.com',
        'carlos.oliveira@example.com',
        'ana.souza@example.com'
      ]
    });
  };




