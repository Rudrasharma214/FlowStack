import OTP from "../models/otp.model.js";

export class OtpRepository {

    /* Create new OTP */
    async createOtp(userId, code, expiresAt, transaction = null) {
        return await OTP.create({ 
            user_id: userId, 
            code, 
            expiresAt 
        }, { transaction });
    }

    /* Find OTP by user ID and code */
    async findByUserIdAndCode(userId, code, transaction = null) {
        return await OTP.findOne({ 
            where: { 
                user_id: userId, 
                code 
            }, transaction
        });
    }

    /* Delete OTP by ID */
    async deleteOtpById(otpId, transaction = null) {
        return await OTP.destroy({ 
            where: { 
                id: otpId 
            }
        }, { transaction });
    }

};