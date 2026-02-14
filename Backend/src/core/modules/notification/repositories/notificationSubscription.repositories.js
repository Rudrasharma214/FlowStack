import NotificationSubscription from '../models/notificationSubscription.model.js';

export class NotificationSubscriptionRepository {

    /* Find Notification Subscription */
    async findOne(where, transaction = null) {
        return await NotificationSubscription.findOne({ where, transaction });
    }

    /* Create Notification Subscription */
    async createSubscription({data, transaction = null}) {
        return await NotificationSubscription.create(
            data,
            { transaction }
        );
    }
};