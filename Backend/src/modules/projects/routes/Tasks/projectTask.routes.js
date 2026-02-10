import express from 'express';
import { authenticate } from '../../../../core/modules/auth/middlewares/auth.middleware.js';
import { ProjectTaskController } from '../controllers/Tasks/projectTask.controller.js';
import { ProjectTaskService } from '../../services/Tasks/projectTask.service.js';

const projectTaskService = new ProjectTaskService();
const projectTaskController = new ProjectTaskController(projectTaskService);

const projectTaskRoutes = express.Router({ mergeParams: true });

projectTaskRoutes.use(authenticate);

/**
 * @route POST /api/projects/:projectId/tasks
 * @desc Create a new task for a project
 * @access Private
 */
projectTaskRoutes.post(
    '/',
    projectTaskController.createTask
);

/**
 * @route GET /api/projects/:projectId/tasks
 * @desc Get all tasks for a project
 * @access Private
 */
projectTaskRoutes.get(
    '/',
    projectTaskController.getTasks
);

/**
 * @route GET /api/projects/:projectId/tasks/:taskId
 * @desc Get a specific task by ID
 * @access Private
 */
projectTaskRoutes.get(
    '/:taskId',
    projectTaskController.getTaskById
);

/**
 * @route PUT /api/projects/:projectId/tasks/:taskId
 * @desc Update a specific task by ID
 * @access Private  
 */
projectTaskRoutes.put(
    '/:taskId',
    projectTaskController.updateTask
);

/**
 * @route DELETE /api/projects/:projectId/tasks/:taskId
 * @desc Delete a specific task by ID
 * @access Private
 */
projectTaskRoutes.delete(
    '/:taskId',
    projectTaskController.deleteTask
);

/**
 * @route POST /api/projects/:projectId/tasks/:taskId/add
 * @desc Add dependencies to a specific task
 * @access Private
 */
projectTaskRoutes.post(
    '/:taskId/add',
    projectTaskController.addDependencies
);

export default projectTaskRoutes;