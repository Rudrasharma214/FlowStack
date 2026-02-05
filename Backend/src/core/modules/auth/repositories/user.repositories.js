import User from '../models/user.model.js';

export class UserRepository {

    /* Find user by email */
    async findByEmail(email, transaction = null) {
        return await User.findOne({ where: { email }, transaction });
    }

    /* Create new user */
    async createUser(userData, transaction = null) {
        return await User.create(userData, { transaction });
    }

    /* Find user by ID */
    async findById(userId, transaction = null) {
        return await User.findByPk(userId, { transaction });
    }

};
