import ProjectTaskDepenedencies from '../../models/Tasks/projectTaskDependencies.model.js';

export class ProjectTaskDependenciesRepository {
  /* Create a new Task Dependency */
  async createTaskDependency(data, transaction = null) {
    return await ProjectTaskDepenedencies.create(data, { transaction });
  }

  /* Get Task Dependencies by Dependency ID */
  async getTaskDependenciesByDependencyId(dependencyId, transaction = null) {
    return await ProjectTaskDepenedencies.findByPk(dependencyId, {
      transaction,
    });
  }

  /* Remove a Task Dependency */
  async removeTaskDependency(dependencyId, transaction = null) {
    return await ProjectTaskDepenedencies.destroy({
      where: { id: dependencyId },
      force: true,
      transaction,
    });
  }
}
