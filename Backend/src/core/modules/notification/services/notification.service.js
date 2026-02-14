import { STATUS } from '../../../constants/statusCodes.js';
import { NotificationPreferenceRepository } from '../repositories/notificationPreference.repositories.js';
import { NotificationSubscriptionRepository } from '../repositories/notificationSubscription.repositories.js';

const prefrerenceRepo = new NotificationPreferenceRepository();
const subscriptionRepo = new NotificationSubscriptionRepository();
export class NotificationService {
    /* Update Notification Preferences */
    async updatePreferences(
        userId,
        preferenceId,
        { enabled, dnd_start, dnd_end }
    ) {
        try {
            const preference = await prefrerenceRepo.findOne({
                where: { id: preferenceId, user_id: userId }
            });
            if (!preference) {
                return {
                    success: false,
                    statusCode: STATUS.NOT_FOUND,
                    message: 'Notification preference not found for the user.',
                    errors: []
                };
            }

            await prefrerenceRepo.updatePreferences(preferenceId, userId, {
                enabled,
                dnd_start,
                dnd_end
            });

            return {
                success: true,
                statusCode: STATUS.OK,
                message: 'Notification preferences updated successfully.',
                data: {
                    id: preferenceId,
                    user_id: userId,
                    enabled,
                    dnd_start,
                    dnd_end
                }
            };
        } catch (error) {
            return {
                success: false,
                statusCode: STATUS.INTERNAL_ERROR,
                message: 'An error occurred while updating notification preferences.',
                errors: [error.message]
            };
        }
    }

    /* Get Notification Preferences */
    async getPreferences(userId) {
        try {
            const where = { user_id: userId };
            const preferences = await prefrerenceRepo.findOne(where);
            if (!preferences) {
                return {
                    success: false,
                    statusCode: STATUS.NOT_FOUND,
                    message: 'No notification preferences found for the user.',
                    errors: []
                };
            }

            return {
                success: true,
                statusCode: STATUS.OK,
                message: 'Notification preferences retrieved successfully.',
                data: preferences
            };
        } catch (error) {
            return {
                success: false,
                statusCode: STATUS.INTERNAL_ERROR,
                message: 'An error occurred while retrieving notification preferences.',
                errors: [error.message]
            };
        }
    }

    /* Subscribe to Notifications */
    async subscribeToNotifications(userId, data) {
        try {
            const createData = {
                user_id: userId,
                endpoint: data.endpoint,
                p256dh_key: data.keys.p256dh,
                auth_key: data.keys.auth,
                browser: data.browser || null,
                platform: data.platform || null
            };

            const result = await subscriptionRepo.createSubscription({ data: createData });

            return {
                success: true,
                statusCode: STATUS.CREATED,
                message: 'Subscribed to notifications successfully.',
                data: result
            };
        } catch (error) {
            return {
                success: false,
                statusCode: STATUS.INTERNAL_ERROR,
                message: 'An error occurred while subscribing to notifications.',
                errors: [error.message]
            };
        }
    }
}
