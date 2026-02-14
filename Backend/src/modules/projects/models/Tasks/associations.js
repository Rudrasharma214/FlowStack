import ProjectTask from './projectTask.model.js';
import ProjectTaskDependencies from './projectTaskDependencies.model.js';
import User from '../../../../core/modules/auth/models/user.model.js';

export class ProjectTaskAssociations {
  static associate() {
    // ProjectTask self-referencing associations for parent-child tasks
    ProjectTask.hasMany(ProjectTask, {
      foreignKey: 'parent_task_id',
      as: 'subtasks',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    ProjectTask.belongsTo(ProjectTask, {
      foreignKey: 'parent_task_id',
      as: 'parentTask',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    // ProjectTask to User associations
    ProjectTask.belongsTo(User, {
      foreignKey: 'assign_to',
      as: 'assignedTo',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    ProjectTask.belongsTo(User, {
      foreignKey: 'assigned_by',
      as: 'assignedBy',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    ProjectTask.belongsTo(User, {
      foreignKey: 'updated_by',
      as: 'updatedBy',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    // ProjectTask to ProjectTaskDependencies associations
    ProjectTask.hasMany(ProjectTaskDependencies, {
      foreignKey: 'project_task_id',
      as: 'dependencies',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    ProjectTask.hasMany(ProjectTaskDependencies, {
      foreignKey: 'depends_on_task_id',
      as: 'dependentTasks',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // ProjectTaskDependencies associations
    ProjectTaskDependencies.belongsTo(ProjectTask, {
      foreignKey: 'project_task_id',
      as: 'task',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    ProjectTaskDependencies.belongsTo(ProjectTask, {
      foreignKey: 'depends_on_task_id',
      as: 'dependsOnTask',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    ProjectTaskDependencies.belongsTo(User, {
      foreignKey: 'created_by',
      as: 'createdBy',
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    });

    ProjectTaskDependencies.belongsTo(User, {
      foreignKey: 'updated_by',
      as: 'updatedBy',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  }
}
