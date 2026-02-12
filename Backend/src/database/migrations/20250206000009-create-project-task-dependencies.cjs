'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('project_task_dependencies', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: 'Primary key for the ProjectTaskDependencies model',
      },
      project_task_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'project_tasks',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment: 'Foreign key referencing the associated project task',
      },
      depends_on_task_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'project_tasks',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment:
          'Foreign key referencing the task that the project task depends on',
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Description of the dependency between the tasks',
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        comment: 'User ID of the person who created the dependency',
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
        comment: 'User ID of the person who last updated the dependency',
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
    await queryInterface.addIndex('project_task_dependencies', [
      'project_task_id',
    ]);
    await queryInterface.addIndex('project_task_dependencies', [
      'depends_on_task_id',
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('project_task_dependencies');
  },
};
