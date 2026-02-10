import { sequelize } from '../../../../config/db.js';
import { DataTypes } from 'sequelize';

const ProjectNotes = sequelize.define(
    'ProjectNotes',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: 'Primary key for the ProjectNotes model',
        },

        project_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'Foreign key referencing the associated project',
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'Name of the person who wrote the note',
        },

        note: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: 'Content of the project note',
        },

        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'User ID of the person who created the note',
        },

        updated_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: 'User ID of the person who last updated the note',
        },
    },
    {
        tableName: 'project_notes',
        paranoid: true,
        indexes: [
            { fields: ['project_id', 'note'] },
            { fields: ['created_by'] },
            { fields: ['updated_by'] },
        ]
    }
);

export default ProjectNotes;