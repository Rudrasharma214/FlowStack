import { sendResponse, sendErrorResponse } from '../../../../core/utils/response.js';
import { STATUS } from '../../../../core/constants/statusCodes.js';

export class ProjectTaskController {
    constructor(projectTaskService) {
        this.projectTaskService = projectTaskService;
        this.createTask = this.createTask.bind(this);
        this.getTasks = this.getTasks.bind(this);
        this.getTaskById = this.getTaskById.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.addDependencies = this.addDependencies.bind(this);
        this.removeDependencies = this.removeDependencies.bind(this);
    }

    /* Create a new Task */
    async createTask(req, res, next) {
        try {
            const { id: userId } = req.user;
            const { projectId } = req.params;
            const taskData = req.body;

            const result = await this.projectTaskService.createTask(
                parseInt(projectId),
                parseInt(userId),
                taskData
            );

            if (!result.success) {
                return sendErrorResponse(res, result.statusCode, result.message, result.errors);
            }

            sendResponse(res, STATUS.CREATED, result.message, result.data);
        } catch (error) {
            next(error);
        }
    };

    /* Get All Tasks */
    async getTasks(req, res, next) {
        try {
            const { projectId } = req.params;
            const { page = 1, limit = 10, search = '' } = req.query;

            const result = await this.projectTaskService.getTasks(
                parseInt(projectId),
                parseInt(page),
                parseInt(limit),
                search
            );

            if (!result.success) {
                return sendErrorResponse(res, result.statusCode, result.message, result.errors);
            }

            sendResponse(res, STATUS.OK, result.message, result.data);
        } catch (error) {
            next(error);
        }
    };

    /* Get Task by ID */
    async getTaskById(req, res, next) {
        try {
            const { projectId, taskId } = req.params;

            const result = await this.projectTaskService.getTaskById(
                parseInt(projectId),
                parseInt(taskId)
            );

            if (!result.success) {
                return sendErrorResponse(res, result.statusCode, result.message, result.errors);
            }

            sendResponse(res, STATUS.OK, result.message, result.data);
        } catch (error) {
            next(error);
        }
    };

    /* Update Task */
    async updateTask(req, res, next) {
        try {
            const { id: userId } = req.user;
            const { projectId, taskId } = req.params;
            const taskData = req.body;

            const result = await this.projectTaskService.updateTask(
                parseInt(projectId),
                parseInt(taskId),
                parseInt(userId),
                taskData
            );

            if (!result.success) {
                return sendErrorResponse(res, result.statusCode, result.message, result.errors);
            }

            sendResponse(res, STATUS.OK, result.message, result.data);
        } catch (error) {
            next(error);
        }
    };

    /* Delete Task */
    async deleteTask(req, res, next) {
        try {
            const { projectId, taskId } = req.params;

            const result = await this.projectTaskService.deleteTask(
                parseInt(projectId),
                parseInt(taskId)
            );

            if (!result.success) {
                return sendErrorResponse(res, result.statusCode, result.message, result.errors);
            }

            sendResponse(res, STATUS.OK, result.message, result.data);
        } catch (error) {
            next(error);
        }
    };

    /* Add Dependencies to a Task */
    async addDependencies(req, res, next) {
        try {
            const { id: userId } = req.user;
            const { projectId, taskId } = req.params;
            const { dependentId, description } = req.body;

            const result = await this.projectTaskService.addDependencies(
                parseInt(userId),
                parseInt(projectId),
                parseInt(taskId),
                parseInt(dependentId),
                description
            );

            if (!result.success) {
                return sendErrorResponse(res, result.statusCode, result.message, result.errors);
            }

            sendResponse(res, STATUS.OK, result.message, result.data);
        } catch (error) {
            next(error);
        }
    };

    /* Remove Dependencies from a Task */
    async removeDependencies(req, res, next) {
        try {
            const { projectId, taskId, dependencyId } = req.params;

            const result = await this.projectTaskService.removeDependencies(
                parseInt(projectId),
                parseInt(taskId),
                parseInt(dependencyId)
            );

            if(!result.success) {
                return sendErrorResponse(res, result.statusCode, result.message, result.errors);
            }

            sendResponse(res, STATUS.OK, result.message, result.data);
        } catch (error) {
            next(error);
        }
    };
};
