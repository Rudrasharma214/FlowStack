import ProjectTask from '../../models/Tasks/projectTask.model.js';

export class ProjectTaskRepository {
    
    /* Create a new Task */
    async createTask(data, transaction = null) {
        return await ProjectTask.create(data, { transaction });
    };

    /* Get All Tasks */
    async getTasks(whereClause, options = {}, include = [], transaction = null) {
        return await ProjectTask.findAll({ where: whereClause, ...options, include, transaction });
    };

    /* Get Task by ID */
    async getTaskById(taskId, transaction = null) {
        return await ProjectTask.findByPk(taskId, { transaction });
    };

    /* Update Task */
    async updateTask(taskId, data, transaction = null) {
        const task = await ProjectTask.findByPk(taskId, { transaction });
        if (!task) return null;
        return await task.update(data, { transaction });
    };

    /* Delete Task */
    async deleteTask(taskId, transaction = null) {
        const task = await ProjectTask.findByPk(taskId, { transaction });
        if (!task) return null;
        await task.destroy({ transaction });
        return task;
    };
};