import express from 'express';
import { NotificationController } from '../controllers/notification.controller.js';
import { authenticate } from '../../../middleware/auth.middleware.js';


const notificationRouter = express.Router();

/**
 * @route PUT /api/notifications/:preferenceId
 * @desc Update notification preferences for the authenticated user
 */
notificationRouter.put('/:preferenceId', NotificationController.updatePreferences);

export default notificationRouter;  