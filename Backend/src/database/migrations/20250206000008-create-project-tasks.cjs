'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('project_tasks', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: 'Primary key for the ProjectTask model',
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'projects',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment: 'Foreign key referencing the associated project',
      },
      parent_task_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'project_tasks',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        comment: 'Foreign key referencing the associated task',
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Title of the project task',
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Detailed description of the project task',
      },
      priority: {
        type: Sequelize.ENUM('low', 'medium', 'high'),
        allowNull: false,
        comment: 'Priority level of the project task',
      },
      status: {
        type: Sequelize.ENUM('pending', 'in_progress', 'completed', 'dependent'),
        allowNull: false,
        defaultValue: 'pending',
        comment: 'Current status of the project task',
      },
      assign_to: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        comment: 'User ID of the person assigned to the task',
      },
      assigned_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'Timestamp when the task was assigned',
      },
      assigned_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        comment: 'User ID of the person who assigned the task',
      },
      due_date: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'Due date for the project task',
      },
      completed_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'Timestamp when the task was marked as completed',
      },
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        comment: 'User ID of the person who last updated the task',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    // Add indexes
    await queryInterface.addIndex('project_tasks', ['project_id']);
    await queryInterface.addIndex('project_tasks', ['priority']);
    await queryInterface.addIndex('project_tasks', ['status']);
    await queryInterface.addIndex('project_tasks', ['assign_to']);
    await queryInterface.addIndex('project_tasks', ['assigned_by']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('project_tasks');
  },
};
