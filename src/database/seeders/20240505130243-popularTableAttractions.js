'use strict';

//const { queryInterface, Sequelize } = require("sequelize");

  module.exports = {
up: async (queryInterface, Sequelize) => {
await queryInterface.bulkInsert('attractions',[

    {
        name: 'Praia da Joaquina',
        description: 'Conhecida pelas suas dunas e ondas propícias para o surf, tendo uma infraestrutura boa para ficar com a família.',
        visitDate: new Date('2024-01-15'),
        cep: '88062-400',
        address: 'Avenida Prefeito Acácio Garibaldi S Thiago, FLorianópolis, SC',
        latitude: -27.6285,
        longitude: -48.4676,
        attractionCategory: 'natural',
        visibility: 'private',
        adventureLevel: 'Radical',
        cost: 'Gratuito',
        rate: '10',
        accessibility: true,
        selectiveWasteCollection: true,
        user_id: 1,
        createdAt: new Date('2024-05-05'),
        updatedAt: new Date('2024-05-05')
      },
      {
        name: 'Lagoa da Conceição',
        description: 'Um dos cartões postais de Florianópolis, ideal para prática de esportes náuticos.',
        visitDate: new Date('2024-03-15'),
        cep: '88062-020',
        address: 'Avenida das Rendeiras, FLorianópolis, SC',
        latitude: -27.6136,
        longitude: -48.5015,
        attractionCategory: 'natural',
        visibility: 'private',
        adventureLevel: 'Moderado',
        cost: 'Gratuito',
        rate: '9',
        accessibility: true,
        selectiveWasteCollection: true,
        user_id: 4,
        createdAt: new Date('2024-05-05'),
        updatedAt: new Date('2024-05-05')
      },
      {
        name: 'Praia Mole',
        description: 'Famosa pela beleza de suas águas e pela presença de jovens.',
        visitDate: new Date('2024-04-05'),
        cep: '88061-200',
        address: 'Rodovia Jornalista Manoel de Menezes, FLorianópolis, SC',
        latitude: -27.6030,
        longitude: -48.4606,
        attractionCategory: 'natural',
        visibility: 'private',
        adventureLevel: 'Tranquilo',
        cost: 'Gratuito',
        rate: '10',
        accessibility: false,
        selectiveWasteCollection: true,
        user_id: 3,
        createdAt: new Date('2024-05-05'),
        updatedAt: new Date('2024-05-05')
      },
      {
        name: 'Barra da Lagoa',
        description: 'Conhecida pela beleza de suas praias e pelo canal que liga a Lagoa da Conceição ao mar.',
        visitDate: new Date('2024-05-03'),
        cep: '88061-300',
        address: 'Rua Angelina Joaquina dos Santos, FLorianópolis, SC',
        latitude: -27.5746,
        longitude: -48.4330,
        attractionCategory: 'natural',
        visibility: 'private',
        adventureLevel: 'Tranquilo',
        cost: 'Gratuito',
        rate: '10',
        accessibility: true,
        selectiveWasteCollection: true,
        user_id: 2,
        createdAt: new Date('2024-05-05'),
        updatedAt: new Date('2024-05-05')
      },
      {
        name: 'Projeto Tamar',
        description: 'Centro de visitantes do Projeto Tamar, voltado para a conservação das tartarugas marinhas.',
        visitDate: new Date('2024-01-05'),
        cep: '88053-700',
        address: 'Rua Professor Ademir Francisco, 100, FLorianópolis, SC',
        latitude: -27.7023,
        longitude: -48.4082,
        attractionCategory: 'natural',
        visibility: 'public',
        adventureLevel: 'Tranquilo',
        cost: 'Barato',
        rate: '10',
        accessibility: true,
        selectiveWasteCollection: true,
        user_id: 1,
        createdAt: new Date('2024-05-05'),
        updatedAt: new Date('2024-05-05')
        },
       {
         name: 'Ponte Hercílio Luz',
        description: 'A Ponte Hercílio Luz é uma ponte pênsil localizada em Florianópolis, no estado brasileiro de Santa Catarina, sendo a mais antiga das três que ligam as partes insular e continental da capital catarinense. É a maior ponte suspensa do Brasil.',
        visitDate: new Date('2024-01-04'),
        cep: '88010-400',
        address: 'Rua Jornalista Assis Chateaubriand 70, FLorianópolis, SC',
        latitude: -27.5935000,
        longitude: -48.5649000,
        attractionCategory: 'urbana',
        visibility: 'public',
        adventureLevel: 'Tranquilo',
        cost: 'Gratuito',
        rate: '10',
        accessibility: true,
        selectiveWasteCollection: true,
        user_id: 1,
        createdAt: new Date('2024-05-05'),
        updatedAt: new Date('2024-05-05')
      }
])

},


down: async (queryInterface, Sequelize) => {
await queryInterface.bulkDelete('attractions',{
   name: [
        'Praia da Joaquina',
        'Lagoa da Conceição',
        'Praia Mole',
        'Barra da Lagoa',
        'Projeto Tamar',
        'Ponte Hercílio Luz'
    ]
})
}
}