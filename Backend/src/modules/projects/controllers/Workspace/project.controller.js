import { sendResponse, sendErrorResponse } from '../../../../core/utils/response.js';
import { STATUS } from '../../../../core/constants/statusCodes.js';


export class ProjectController {
    constructor(projectService) {
        this.projectService = projectService;
        this.createProject = this.createProject.bind(this);
        this.getAllProjects = this.getAllProjects.bind(this);
        this.getProjectById = this.getProjectById.bind(this);
        this.updateProject = this.updateProject.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
    }

    /* Create a new project */
    async createProject(req, res, next) {
        try {
            const { id: userId } = req.user;
            const { name, description } = req.body;

            const result = await this.projectService.createProject({
                name,
                description,
                created_by: userId
            });

            if (!result.success) {
                return sendErrorResponse(res, result.statusCode, result.message, result.errors);
            }

            sendResponse(res, STATUS.CREATED, result.message, result.data);
        } catch (error) {
            next(error);
        }
    };

    /* Get all projects */
    async getAllProjects(req, res, next) {
        try {
            const { id: userId } = req.user;
            const { page = 1, limit = 10, search } = req.query;
            const result = await this.projectService.getAllProjects(
                userId,
                parseInt(page),
                parseInt(limit),
                search
            );

            if (!result.success) {
                return sendErrorResponse(res, result.statusCode, result.message, result.errors);
            }

            sendResponse(res, STATUS.OK, result.message, result.data);
        } catch (error) {
            next(error);
        }
    };

    /* Get project details by ID */
    async getProjectById(req, res, next) {
        try {
            const { projectId } = req.params;
            const result = await this.projectService.getProjectById(projectId);

            if (!result.success) {
                return sendErrorResponse(res, result.statusCode, result.message, result.errors);
            }

            sendResponse(res, STATUS.OK, result.message, result.data);
        } catch (error) {
            next(error);
        }
    };

    /* Update project details by ID */
    async updateProject(req, res, next) {
        try {
            const { id: userId } = req.user;
            const { projectId } = req.params;
            const { name, description, status } = req.body;

            const result = await this.projectService.updateProject(
                parseInt(projectId),
                name,
                description,
                status,
                parseInt(userId)
            );

            if (!result.success) {
                return sendErrorResponse(res, result.statusCode, result.message, result.errors);
            }

            sendResponse(res, STATUS.OK, result.message, result.data);
        } catch (error) {
            next(error);
        }
    };

    /* Delete a project by ID */
    async deleteProject(req, res, next) {
        try {
            const { projectId } = req.params;

            const result = await this.projectService.deleteProject(parseInt(projectId));

            if (!result.success) {
                return sendErrorResponse(res, result.statusCode, result.message, result.errors);
            }

            sendResponse(res, STATUS.OK, result.message);
        } catch (error) {
            next(error);
        }
    };
    
};