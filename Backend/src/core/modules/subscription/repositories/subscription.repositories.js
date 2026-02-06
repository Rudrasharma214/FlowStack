import Subscription from '../models/subscription.model.js';

export class SubscriptionRepository {

    /* Create Subscription */
    async createSubscription(data, transaction = null) {
        return await Subscription.create(data, { transaction });
    }

    /* Find One Subscription */
    async findOne({
        where = {},
        attributes = null,
        include = [],
        transaction = null,
        paranoid = true
    }) {
        return await Subscription.findOne({
            where,
            attributes,
            include,
            transaction,
            paranoid
        });
    }
}
