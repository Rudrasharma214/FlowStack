import { STATUS } from '../../../../core/constants/statusCodes.js';
import { ProjectRepository } from '../../repositories/Workspace/project.repositories.js';
import { ProjectTaskRepository } from '../../repositories/Tasks/proejctTask.repositories.js';
import { ProjectTaskDependenciesRepository } from '../../repositories/Tasks/projectTaskDependencies.repositories.js';
import ProjectTaskDependencies from '../../models/Tasks/projectTaskDependencies.model.js';
import User from '../../../../core/modules/auth/models/user.model.js';
import ProjectTask from '../../models/Tasks/projectTask.model.js';
import { sequelize } from '../../../../config/db.js';
import { Op } from 'sequelize';

const projectRepository = new ProjectRepository();
const projectTaskRepository = new ProjectTaskRepository();
const projectTaskDependenciesRepository =
  new ProjectTaskDependenciesRepository();
export class ProjectTaskService {
    /* Create a new Task */
    async createTask(projectId, userId, taskData) {
        const transaction = await sequelize.transaction();
        try {
            const project = await projectRepository.getProjectByPk(
                projectId,
                transaction
            );
            if (!project) {
                await transaction.rollback();
                return {
                    success: false,
                    statusCode: STATUS.NOT_FOUND,
                    message: 'Project not found',
                    errors: null
                };
            }

            const data = {
                project_id: projectId,
                parent_task_id: taskData.parent_task_id || null,
                title: taskData.title,
                description: taskData.description || null,
                priority: taskData.priority,
                status: taskData.status || 'pending',
                assign_to: taskData.assign_to || null,
                assigned_at: taskData.assign_to ? new Date() : null,
                assigned_by: userId,
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
            };
        } catch (error) {
            await transaction.rollback();
            return {
                success: false,
                statusCode: STATUS.INTERNAL_ERROR,
                message: 'Failed to create task',
                errors: error.message
            };
        }
    }

    /* Get All Tasks */
    async getTasks(projectId, page, limit, search) {
        try {
            const offset = (page - 1) * limit;

            let whereClause = { project_id: projectId };
            if (search) {
                whereClause = {
                    ...whereClause,
                    title: { [Op.like]: `%${search}%` }
                };
            }

            const options = {
                offset,
                limit,
                order: [['createdAt', 'DESC']]
            };

            const tasks = await projectTaskRepository.getTasks(whereClause, options);

            if (tasks.length === 0) {
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
                data: {
                    tasks: tasks.rows,
                    pagination: {
                        total: tasks.count,
                        page,
                        limit,
                        totalPages: Math.ceil(tasks.count / limit)
                    }
                }
            };
        } catch (error) {
            return {
                success: false,
                statusCode: STATUS.INTERNAL_ERROR,
                message: 'Failed to fetch tasks',
                errors: error.message
            };
        }
    }

    /* Get Task by ID */
    async getTaskById(projectId, taskId) {
        try {
            const whereClause = { project_id: projectId, id: taskId };

            const task = await projectTaskRepository.getTaskById({
                whereClause,
                include: [
                    {
                        model: ProjectTask,
                        as: 'subtasks'
                    },
                    {
                        model: User,
                        as: 'assignedTo',
                        attributes: ['id', 'name', 'email']
                    },
                    {
                        model: User,
                        as: 'assignedBy',
                        attributes: ['id', 'name', 'email']
                    },
                    {
                        model: ProjectTaskDependencies,
                        as: 'dependencies',
                        include: [
                            {
                                model: User,
                                as: 'createdBy',
                                attributes: ['id', 'name', 'email']
                            }
                        ]
                    }
                ]
            });

            if (!task) {
                return {
                    success: false,
                    statusCode: STATUS.NOT_FOUND,
                    message: 'Task not found',
                    errors: null
                };
            }

            return {
                success: true,
                statusCode: STATUS.OK,
                message: 'Task fetched successfully',
                data: task
            };
        } catch (error) {
            return {
                success: false,
                statusCode: STATUS.INTERNAL_ERROR,
                message: 'Failed to fetch task',
                errors: error.message
            };
        }
    }

    /* Update Task */
    async updateTask(projectId, taskId, userId, taskData) {
        try {
            const task = await projectTaskRepository.getTaskById({
                whereClause: { project_id: projectId, id: taskId }
            });

            if (!task) {
                return {
                    success: false,
                    statusCode: STATUS.NOT_FOUND,
                    message: 'Task not found',
                    errors: null
                };
            }
            const data = {
                title: taskData.title || task.title,
                description: taskData.description || task.description,
                priority: taskData.priority || task.priority,
                status: taskData.status || task.status,
                assign_to: taskData.assign_to || task.assign_to,
                assigned_at: taskData.assign_to ? new Date() : task.assigned_at,
                completed_at:
          taskData.status === 'completed' ? new Date() : task.completed_at,
                due_date: taskData.due_date || task.due_date,
                updated_by: userId
            };
            const updatedTask = await projectTaskRepository.updateTask(
                projectId,
                taskId,
                data
            );

            return {
                success: true,
                statusCode: STATUS.OK,
                message: 'Task updated successfully',
                data: updatedTask
            };
        } catch (error) {
            return {
                success: false,
                statusCode: STATUS.INTERNAL_ERROR,
                message: 'Failed to update task',
                errors: error.message
            };
        }
    }

    /* Delete Task */
    async deleteTask(projectId, taskId) {
        try {
            const whereClause = { project_id: projectId, id: taskId };
            const task = await projectTaskRepository.getTaskById({ whereClause });
            if (!task) {
                return {
                    success: false,
                    statusCode: STATUS.NOT_FOUND,
                    message: 'Task not found',
                    errors: null
                };
            }

            await projectTaskRepository.deleteTask(projectId, taskId);

            return {
                success: true,
                statusCode: STATUS.OK,
                message: 'Task deleted successfully',
                data: null
            };
        } catch (error) {
            return {
                success: false,
                statusCode: STATUS.INTERNAL_ERROR,
                message: 'Failed to delete task',
                errors: error.message
            };
        }
    }

    /* Add Dependencies to a Task */
    async addDependencies(userId, projectId, taskId, dependentId, description) {
        try {
            const whereClause = { project_id: projectId, id: taskId };
            const task = await projectTaskRepository.getTaskById({ whereClause });
            if (!task) {
                return {
                    success: false,
                    statusCode: STATUS.NOT_FOUND,
                    message: 'Task not found',
                    errors: null
                };
            }

            const data = {
                project_task_id: taskId,
                depends_on_task_id: dependentId,
                description: description || null,
                created_by: userId
            };

            const newDependency =
        await projectTaskDependenciesRepository.createTaskDependency(data);

            return {
                success: true,
                statusCode: STATUS.OK,
                message: 'Dependency added successfully',
                data: newDependency
            };
        } catch (error) {
            return {
                success: false,
                statusCode: STATUS.INTERNAL_ERROR,
                message: 'Failed to add dependencies',
                errors: error.message
            };
        }
    }

    /* Remove Dependencies from a Task */
    async removeDependencies(projectId, taskId, dependencyId) {
        const transaction = await sequelize.transaction();
        try {
            const whereClause = { project_id: projectId, id: taskId };
            const task = await projectTaskRepository.getTaskById({
                whereClause,
                transaction
            });
            if (!task) {
                await transaction.rollback();
                return {
                    success: false,
                    statusCode: STATUS.NOT_FOUND,
                    message: 'Task not found',
                    errors: null
                };
            }

            const dependency =
        await projectTaskDependenciesRepository.getTaskDependenciesByDependencyId(
            dependencyId,
            transaction
        );
            if (!dependency) {
                await transaction.rollback();
                return {
                    success: false,
                    statusCode: STATUS.NOT_FOUND,
                    message: 'Dependency not found',
                    errors: null
                };
            }

            await projectTaskDependenciesRepository.removeTaskDependency(
                dependencyId,
                transaction
            );
            await transaction.commit();
            return {
                success: true,
                statusCode: STATUS.OK,
                message: 'Dependency removed successfully',
                data: null
            };
        } catch (error) {
            await transaction.rollback();
            return {
                success: false,
                statusCode: STATUS.INTERNAL_ERROR,
                message: 'Failed to remove dependencies',
                errors: error.message
            };
        }
    }
}
