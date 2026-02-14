import { sequelize } from '../../../../config/db.js';
import { DataTypes } from 'sequelize';

const NotificationPreference = sequelize.define(
    'NotificationPreference',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },

        dnd_start: {
            type: DataTypes.TIME,
            allowNull: true
        },

        dnd_end: {
            type: DataTypes.TIME,
            allowNull: true
        }
    },
    {
        tableName: 'notification_preferences',
        paranoid: true,
        indexes: [
            {
                unique: true,
                fields: ['user_id']
            }
        ]
    }
);

export default NotificationPreference;
