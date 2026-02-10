import { sendResponse, sendErrorResponse } from '../../../../core/utils/response.js';
import { STATUS } from '../../../../core/constants/statusCodes.js';

export class ProjectTaskController {
    constructor(projectTaskService) {   
        this.projectTaskService = projectTaskService;
        this.createTask = this.createTask.bind(this);
        // this.getTasks = this.getTasks.bind(this);
        // this.getTaskById = this.getTaskById.bind(this);
        // this.updateTask = this.updateTask.bind(this);
        // this.deleteTask = this.deleteTask.bind(this);
        // this.assignTask = this.assignTask.bind(this);
        // this.updateTaskStatus = this.updateTaskStatus.bind(this);
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

            if(!result.success) {
                return sendErrorResponse(res, result.statusCode, result.message, result.errors);
            }

            sendResponse(res, STATUS.CREATED, result.message, result.data);
        } catch (error) {
            next(error);
        }
    };
};