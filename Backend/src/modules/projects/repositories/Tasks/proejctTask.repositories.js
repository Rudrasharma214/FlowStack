import ProjectTask from '../../models/Tasks/projectTask.model.js';

export class ProjectTaskRepository {
  /* Create a new Task */
  async createTask(data, transaction = null) {
    return await ProjectTask.create(data, { transaction });
  }

  /* Get All Tasks */
  async getTasks(whereClause, options = {}, include = [], transaction = null) {
    const { count, rows } = await ProjectTask.findAndCountAll({
      where: whereClause,
      ...options,
      include,
      transaction,
    });
    return { count, rows };
  }

  /* Get Task by ID */
  async getTaskById({ whereClause, include = [], transaction = null }) {
    return await ProjectTask.findOne({
      where: whereClause,
      include,
      transaction,
    });
  }

  /* Update Task */
  async updateTask(projectId, taskId, data, transaction = null) {
    return await ProjectTask.update(data, {
      where: { project_id: projectId, id: taskId },
      transaction,
    });
  }

  /* Delete Task */
  async deleteTask(projectId, taskId, transaction = null) {
    return await ProjectTask.destroy({
      where: { project_id: projectId, id: taskId },
      force: true,
      transaction,
    });
  }
}
