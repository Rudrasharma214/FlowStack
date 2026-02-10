import ProjectTaskDepenedencies from '../../models/Tasks/projectTaskDependencies.model.js';

export class ProjectTaskDependenciesRepository {

    /* Create a new Task Dependency */
    async createTaskDependency(data, transaction) {
        return await ProjectTaskDepenedencies.create(data, { transaction });
    };

};