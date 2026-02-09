import Project from '../../models/Workspace/project.model.js';


export class ProjectRepository {

    /* Create a new project */
    async createProject(projectData, transaction = null) {
        return await Project.create(projectData, { transaction });
    }

    /* Get Project by PK */
    async getProjectByPk(projectId, transaction = null) {
        return await Project.findByPk(projectId, { transaction });
    }

    /* Get all projects */
    async getAllProjects(whereClause, offset = 0, limit = 10, transaction = null) {
        const { rows, count } = await Project.findAndCountAll({ where: whereClause, offset, limit, transaction });
        return { rows, count };
    }

    /* Get project details by ID */
    async getProjectById({
        projectId,
        attributes = null,
        include = [],
        transaction = null
    }) {
        return await Project.findOne({
            where: { id: projectId },
            attributes,
            include,
            transaction
        });
    }

    /* Update project details by ID */
    async updateProject(projectId, updateData, transaction = null) {
        return await Project.update(updateData, {
            where: { id: projectId },
            transaction
        });
    }

    /* Delete project by ID */
    async deleteProject(projectId, transaction = null) {
        return await Project.destroy({
            where: { id: projectId },
            transaction
        });
    }
    
};
