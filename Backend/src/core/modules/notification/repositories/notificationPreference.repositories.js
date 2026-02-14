import NotificationPreference from '../models/notificationPreference.model.js';

export class NotificationPreferenceRepository {
    /* Find Notification Preference */
    async findOne(where, transaction = null) {
        return await NotificationPreference.findOne({
            where,
            transaction
        });
    }

    /* Update Notification Preferences */
    async updatePreferences(
        preferenceId,
        userId,
        { enabled, dnd_start, dnd_end },
        transaction = null
    ) {
        return await NotificationPreference.update(
            { enabled, dnd_start, dnd_end },
            {
                where: {
                    id: preferenceId,
                    user_id: userId
                },
                transaction
            }
        );
    }
}
