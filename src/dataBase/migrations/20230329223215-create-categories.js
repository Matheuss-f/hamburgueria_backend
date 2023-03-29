'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('categories', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
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
        await queryInterface.dropTable('categories');
    }
};
