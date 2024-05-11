const { Model, DataTypes, Sequelize } = require('sequelize') 
const { connection } = require('../database/connection')
const { hash } = require('bcryptjs')

const User = connection.define('users', { 
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
           type: DataTypes.ENUM,
            values: ['admin', 'user', 'premiumUser'],
            allowNull: false,
           defaultValue: 'user',
           validate: {
            isIn: {
                args: [['admin', 'user', 'premiumUser']],
                msg: "O papel especificado não é válido"
            }
        }
      },
}
,{paranoid: true}

)

module.exports = User
