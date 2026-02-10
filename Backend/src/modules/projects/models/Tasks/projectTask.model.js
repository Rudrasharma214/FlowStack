import { sequelize } from '../../../../config/db.js';
import { DataTypes } from 'sequelize';

const ProjectTask = sequelize.define(
    'ProjectTask',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: 'Primary key for the ProjectTask model'
        },

        project_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'Foreign key referencing the associated project'
        },

        parent_task_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: 'Foreign key referencing the associated task'
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'Title of the project task'
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: 'Detailed description of the project task'
        },

        priority: {
            type: DataTypes.ENUM('low', 'medium', 'high'),
            allowNull: false,
            comment: 'Priority level of the project task'
        },

        status: {
            type: DataTypes.ENUM('pending', 'in_progress', 'completed', 'dependent'),
            allowNull: false,
            defaultValue: 'pending',
            comment: 'Current status of the project task'
        },

        assign_to: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: 'User ID of the person assigned to the task'
        },

        assigned_at: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: 'Timestamp when the task was assigned'
        },

        assigned_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: 'User ID of the person who assigned the task'
        },

        due_date: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: 'Due date for the project task'
        },

        completed_at: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: 'Timestamp when the task was marked as completed'
        },

        updated_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: 'User ID of the person who last updated the task'
        }
    },
    {
        tableName: 'project_tasks',
        paranoid: true,
        indexes: [
            { fields: ['project_id'] },
            { fields: ['priority'] },
            { fields: ['status'] },
            { fields: ['assign_to'] },
            { fields: ['assigned_by'] }
        ]
    }
);

export default ProjectTask;