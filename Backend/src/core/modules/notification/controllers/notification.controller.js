import { sendErrorResponse, sendResponse } from '../../../utils/response.js';
import { STATUS } from '../../../constants/statusCodes.js';

export class NotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
        this.updatePreferences = this.updatePreferences.bind(this);
        this.getPreferences = this.getPreferences.bind(this);
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

    /* Get Notification Preferences */
    async getPreferences(req, res, next) {
        try {
            const userId = req.user.id;
            const preferences = await this.notificationService.getPreferences(userId);

            if (!preferences.success) {
                return sendErrorResponse(
                    res,
                    preferences.statusCode,
                    preferences.message,
                    preferences.errors
                );
            }

            sendResponse(res, STATUS.OK, preferences.message, preferences.data);
        } catch (error) {
            next(error);
        }
    }

    /* Subscribe to Notifications */
    async subscribeToNotifications(req, res, next) {
        try {
            const userId = req.user.id;
            const data = req.body;
            const result = await this.notificationService.subscribeToNotifications(userId, data);

            if (!result.success) {
                return sendErrorResponse(
                    res,
                    result.statusCode,
                    result.message,
                    result.errors
                );
            };

            sendResponse(res, STATUS.OK, result.message, result.data);
        } catch (error) {
            next(error);
        }
    };
}
