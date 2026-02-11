'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('projects', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: 'Primary key for the project',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Name of the project',
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Description of the project',
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive', 'in_progress', 'completed'),
        allowNull: false,
        defaultValue: 'inactive',
        comment: 'Status of the project',
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'Start date of the project',
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'End date of the project',
      },
      completed_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'Timestamp when the project was marked as completed',
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'Owner ID of the user who created the project',
      },
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: 'User ID of the last user who updated the project',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    // Create indexes
    await queryInterface.addIndex('projects', ['name']);
    await queryInterface.addIndex('projects', ['status']);
    await queryInterface.addIndex('projects', ['created_by']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('projects');
  },
};
