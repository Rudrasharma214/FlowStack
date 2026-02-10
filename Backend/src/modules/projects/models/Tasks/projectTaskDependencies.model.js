import { sequelize } from '../../../../config/db.js';
import { DataTypes } from 'sequelize';

const ProjectTaskDependencies = sequelize.define(
    'ProjectTaskDependencies',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: 'Primary key for the ProjectTaskDependencies model'
        },

        project_task_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'Foreign key referencing the associated project task'
        },

        depends_on_task_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'Foreign key referencing the task that the project task depends on'
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: 'Description of the dependency between the tasks'
        },

        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'User ID of the person who created the dependency'
        },

        updated_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: 'User ID of the person who last updated the dependency'
        }
    },
    {
        tableName: 'project_task_dependencies',
        paranoid: true,
        indexes: [
            { fields: ['project_task_id'] },
            { fields: ['depends_on_task_id'] }
        ]
    }
);

export default ProjectTaskDependencies;