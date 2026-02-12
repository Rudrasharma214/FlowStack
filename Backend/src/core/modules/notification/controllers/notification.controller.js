import { sendErrorResponse, sendResponse } from '../../../utils/response.js';
import { STATUS } from '../../../constants/statusCodes.js';

export class NotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }

    /* Update Notification Preferences */
    async updatePreferences(req, res, next) {
        try {
            const userId = req.user.id;
            const preferenceId = req.params.preferenceId;
            const { enabled, dnd_start, dnd_end } = req.body;

            const updatedPreference =
        await this.notificationService.updatePreferences(
            parseInt(userId),
            parseInt(preferenceId),
            { enabled, dnd_start, dnd_end }
        );

            if (!updatedPreference.success) {
                return sendErrorResponse(
                    res,
                    updatedPreference.statusCode,
                    updatedPreference.message,
                    updatedPreference.errors
                );
            }

            sendResponse(
                res,
                STATUS.OK,
                updatedPreference.message,
                updatedPreference
            );
        } catch (error) {
            next(error);
        }
    }
}
