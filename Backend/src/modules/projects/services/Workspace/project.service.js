import { Op } from 'sequelize';
import { sequelize } from '../../../../config/db.js';
import { STATUS } from '../../../../core/constants/statusCodes.js';
import { ProjectRepository } from '../../repositories/Workspace/project.repositories.js';
import { ProjectMemberRepository } from '../../repositories/Workspace/projectMember.repositories.js';

const projectRepository = new ProjectRepository();
const projectMemberRepository = new ProjectMemberRepository();

export class ProjectService {
    /* Create a new project */
    async createProject(projectData) {
        const transaction = await sequelize.transaction();
        try {
            const createdProject = await projectRepository.createProject(projectData, transaction);

            // Automatically add the creator as the project owner
            await projectMemberRepository.createProjectMember(
                {
                    project_id: createdProject.id,
                    user_id: projectData.created_by,
                    role: 'owner',
                    added_by: projectData.created_by
                },
                transaction
            );

            await transaction.commit();

            return {
                success: true,
                message: 'Project created successfully',
                data: createdProject,
                statusCode: STATUS.CREATED
            };
        } catch (error) {
            await transaction.rollback();
            return {
                success: false,
                message: 'An error occurred while creating the project',
                statusCode: STATUS.INTERNAL_ERROR,
                errors: error.message
            };
        }
    }

    /* Get all projects */
    async getAllProjects(userId, page, limit, search) {
        try {
            const offset = (page - 1) * limit;

            let whereClause = {
                created_by: userId
            };

            if (search) {
                whereClause = {
                    ...whereClause,
                    name: { [Op.like]: `%${search}%` }
                };
            }

            const projects = await projectRepository.getAllProjects(
                whereClause,
                offset,
                limit
            );
            if (!projects || projects.count === 0) {
                return {
                    success: true,
                    message: 'No projects found',
                    data: {
                        projects: [],
                        pagination: {
                            total: 0,
                            page,
                            limit,
                            totalPages: 0
                        }
                    },
                    statusCode: STATUS.NOT_FOUND
                };
            }

            return {
                success: true,
                message: 'Projects fetched successfully',
                data: {
                    projects: projects.rows,
                    pagination: {
                        total: projects.count,
                        page,
                        limit,
                        totalPages: Math.ceil(projects.count / limit)
                    }
                }
            };
        } catch (error) {
            return {
                success: false,
                message: 'An error occurred while fetching projects',
                errors: error.message,
                statusCode: STATUS.INTERNAL_ERROR
            };
        }
    }

    /* Get project details by ID */
    async getProjectById(projectId) {
        try {
            const project = await projectRepository.getProjectById({
                projectId,
                attributes: [
                    'id',
                    'name',
                    'description',
                    'status',
                    'created_by',
                    'created_at',
                    'updated_at'
                ]
            });
            if (!project) {
                return {
                    success: false,
                    message: 'Project not found',
                    statusCode: STATUS.NOT_FOUND
                };
            }

            return {
                success: true,
                message: 'Project fetched successfully',
                data: project
            };
        } catch (error) {
            return {
                success: false,
                message: 'An error occurred while fetching the project',
                errors: error.message,
                statusCode: STATUS.INTERNAL_ERROR
            };
        }
    }

    /* Update project details by ID */
    async updateProject(projectId, name, description, status, userId) {
        try {
            const project = await projectRepository.getProjectByPk(projectId);
            if (!project) {
                return {
                    success: false,
                    message: 'Project not found',
                    statusCode: STATUS.NOT_FOUND
                };
            }

            const updateData = {
                name: name || project.name,
                description: description || project.description,
                status: status || project.status,
                updated_by: userId
            };

            const result = await projectRepository.updateProject(
                projectId,
                updateData
            );

            return {
                success: true,
                message: 'Project updated successfully',
                data: result
            };
        } catch (error) {
            return {
                success: false,
                message: 'An error occurred while updating the project',
                errors: error.message,
                statusCode: STATUS.INTERNAL_ERROR
            };
        }
    }

    /* Delete a project by ID */
    async deleteProject(projectId) {
        try {
            const project = await projectRepository.getProjectByPk(projectId);
            if (!project) {
                return {
                    success: false,
                    message: 'Project not found',
                    statusCode: STATUS.NOT_FOUND
                };
            }

            await projectRepository.deleteProject(projectId);

            return {
                success: true,
                message: 'Project deleted successfully'
            };
        } catch (error) {
            return {
                success: false,
                message: 'An error occurred while deleting the project',
                errors: error.message,
                statusCode: STATUS.INTERNAL_ERROR
            };
        }
    }
}
