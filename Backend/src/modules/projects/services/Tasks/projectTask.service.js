import { STATUS } from "../../../../core/constants/statusCodes.js";
import { ProjectRepository } from "../../repositories/Workspace/project.repositories.js";

const projectRepository = new ProjectRepository();

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
                assign_at: new Date(),
                createdBy: userId
            }
        } catch (error) {
            return {
                success: false,
                statusCode: STATUS.INTERNAL_ERROR,
                message: 'Failed to create task',
                errors: error.message
            }
        }
    };
};