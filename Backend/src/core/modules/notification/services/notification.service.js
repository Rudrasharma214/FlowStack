import { NotificationPreferenceRepository } from "../repositories/notificationPreference.repositories.js";

const prefrerenceRepo = new NotificationPreferenceRepository();

export class NotificationService {
    /* Update Notification Preferences */
    async updatePreferences(userId, preferenceId, { enabled, dnd_start, dnd_end }) {
        try {
            const preference = await prefrerenceRepo.findOne({ where: { id: preferenceId, user_id: userId } });
            if (!preference) {
                return {
                    success: false,
                    statusCode: 404,
                    message: 'Notification preference not found for the user.',
                    errors: []
                }
            }

            await prefrerenceRepo.updatePreferences(preferenceId, userId, { enabled, dnd_start, dnd_end });

            return {
                success: true,
                statusCode: 200,
                message: 'Notification preferences updated successfully.',
                data: { id: preferenceId, user_id: userId, enabled, dnd_start, dnd_end }
            };
        } catch (error) {
            return {
                success: false,
                statusCode: 500,
                message: 'An error occurred while updating notification preferences.',
                errors: [error.message]
            }
        }
    };
};