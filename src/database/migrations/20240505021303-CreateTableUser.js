'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
       id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
       },
       name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.ENUM,
        values: ['Feminino', 'Masculino', 'Outro'],
        allowNull: true
          },
      birthDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      cpf: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true
      },
        email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
             },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
         },
      cep: {
        type: Sequelize.STRING,
        allowNull: false,
         },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
         },   
      addressNumber: {
          type: Sequelize.INTEGER,
          allowNull: false,
           }, 
       addressComplement: {
            type: Sequelize.STRING,
            allowNull: true,
             }, 
       role: {
           type: Sequelize.ENUM,
            values: ['admin', 'user', 'premiumUser'],
            allowNull: false,
           defaultValue: 'user'
        },
        createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
       updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
