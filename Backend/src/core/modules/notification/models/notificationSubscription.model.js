import { sequelize } from '../../../../config/db.js';
import { DataTypes } from 'sequelize';

const NotificationSubscription = sequelize.define(
    'NotificationSubscription',
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

        endpoint: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        p256dh_key: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        auth_key: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        browser: {
            type: DataTypes.STRING,
            allowNull: true
        },

        platform: {
            type: DataTypes.STRING,
            allowNull: true
        },

        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },

        last_used_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        tableName: 'notification_subscriptions',
        paranoid: true,
        indexes: [
            {
                unique: true,
                fields: ['endpoint']
            },
            {
                fields: ['user_id', 'is_active']
            }
        ]
    }
);

export default NotificationSubscription;
