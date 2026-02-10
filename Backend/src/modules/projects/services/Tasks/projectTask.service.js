import { STATUS } from "../../../../core/constants/statusCodes.js";
import { ProjectRepository } from "../../repositories/Workspace/project.repositories.js";
import { ProjectTaskRepository } from "../../repositories/Tasks/proejctTask.repositories.js";

const projectRepository = new ProjectRepository();
const projectTaskRepository = new ProjectTaskRepository();

export class ProjectTaskService {

    /* Create a new Task */
    async createTask(projectId, userId, taskData) {
        const transaction = await this.sequelize.transaction();
        try {
            const project = await projectRepository.getProjectByPk(projectId, transaction);
            if (!project) {
                await transaction.rollback();
                return {
                    success: false,
                    statusCode: STATUS.NOT_FOUND,
                    message: 'Project not found',
                    errors: null
                }
            };

            const data = {
                projectId,
                parent_task_id: taskData.parent_task_id || null,
                title: taskData.title,
                description: taskData.description || null,
                priority: taskData.priority,
                status: taskData.status || 'pending',
                assign_to: taskData.assign_to || null,
                assign_at: taskData.assign_to ? new Date() : null,
                assign_by: userId,
                due_date: taskData.due_date || null,
                createdBy: userId
            };

            const newTask = await projectTaskRepository.createTask(data, transaction);

            await transaction.commit();

            return {
                success: true,
                statusCode: STATUS.CREATED,
                message: 'Task created successfully',
                data: newTask
            }
        } catch (error) {
            await transaction.rollback();
            return {
                success: false,
                statusCode: STATUS.INTERNAL_ERROR,
                message: 'Failed to create task',
                errors: error.message
            }
        }
    };

    /* Get All Tasks */
    async getTasks(projectId, page, limit, search) {
        try {
            const offset = (page - 1) * limit;

            let whereClause = { projectId };
            if (search) {
                whereClause = {
                    ...whereClause,
                    title: { [this.sequelize.Op.iLike]: `%${search}%` }
                };
            }
        
            const options = {
                offset,
                limit,
                order: [['createdAt', 'DESC']]
            };

            const tasks = await projectTaskRepository.getTasks(whereClause, options);

            if(tasks.length === 0) {
                return {
                    success: true,
                    statusCode: STATUS.OK,
                    message: 'No tasks found for this project',
                    data: []
                };
            }

            return {
                success: true,
                statusCode: STATUS.OK,
                message: 'Tasks fetched successfully',
                data: tasks
            };
        } catch (error) {
            return {
                success: false,
                statusCode: STATUS.INTERNAL_ERROR,
                message: 'Failed to fetch tasks',
                errors: error.message
            }
        }
    };
};