'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('attractions', {
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
     description: {
      allowNull: false,
      type: Sequelize.TEXT
     },
     visitDate: {
      allowNull: false,
      type: Sequelize.DATE
    },
     cep: {
      type: Sequelize.STRING,
      allowNull: true,
       },
      referencePoint: {
        allowNull: true,
        type: Sequelize.STRING      
      },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
       },   
    addressNumber: {
        type: Sequelize.INTEGER,
        allowNull: true,
         }, 
     latitude: {
       allowNull: false,
       type: Sequelize.FLOAT
        },
     longitude: {
          allowNull: false,
          type: Sequelize.FLOAT
        },
        geoLocality: {
          allowNull: true,
          type: Sequelize.STRING
        },
     attractionCategory: {
          type: Sequelize.ENUM,
          values: ['natural', 'urbana'],
          allowNull: false
            },
      visibility: {
              type: Sequelize.ENUM,
               values: ['private', 'public'],
               allowNull: false,
              defaultValue: 'private'
           },
     adventureLevel: {
          type: Sequelize.ENUM,
          values: ['radical', 'moderado', 'tranquilo'],
          allowNull: true
            },
     cost: {
          type: Sequelize.ENUM,
          values: ['gratuito', 'barato', 'mediano', 'caro'],
          allowNull: true
            },
      rate: {
          type: Sequelize.ENUM,
          values: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
          allowNull: false
            },
     accessibility: {
          type: Sequelize.BOOLEAN,
          allowNull: true
            },
      selectiveWasteCollection: {
          type: Sequelize.BOOLEAN,
          allowNull: true
            },
     user_id: {
        allowNull: false,
         type: Sequelize.INTEGER,
         references: {
         model: 'users',
         key: 'id'
         },
       onUpdate: 'CASCADE',
       onDelete: 'CASCADE'
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

    await queryInterface.dropTable('attractions');
  }
};
