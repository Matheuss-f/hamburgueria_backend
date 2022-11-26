'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNum: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNum: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNum: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNum: false,
      },
      admin:{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNum: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNum: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNum: false,
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users')
  }
};
