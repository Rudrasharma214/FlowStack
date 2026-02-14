import express from 'express';
import { authenticate } from '../../../../core/modules/auth/middlewares/auth.middleware.js';
import { validate } from '../../../../core/middlewares/validate.middleware.js';
import {
  createProjectSchema,
  updateProjectSchema,
} from '../../validations/Workspace/project.schema.js';
import { ProjectService } from '../../services/Workspace/project.service.js';
import { ProjectController } from '../../controllers/Workspace/project.controller.js';

const projectService = new ProjectService();
const projectController = new ProjectController(projectService);

const projectRoutes = express.Router();

/**
 * @desc Authenticate all routes
 * @access Protected (requires authentication)
 */
projectRoutes.use(authenticate);

/**
 * @route   /api/projects
 * @desc    Create a new project
 * @access  Protected (requires authentication)
 */
projectRoutes.post(
  '/',
  validate(createProjectSchema),
  projectController.createProject
);

/**
 * @route   /api/projects
 * @desc    Get all projects for the authenticated user
 * @access  Protected (requires authentication)
 */
projectRoutes.get('/', projectController.getAllProjects);

/**
 * @route   /api/projects/:projectId
 * @desc    Get project details by ID
 * @access  Protected (requires authentication)
 */
projectRoutes.get('/:projectId', projectController.getProjectById);

/**
 * @route   /api/projects/:projectId
 * @desc    Update project details by ID
 * @access  Protected (requires authentication)
 */
projectRoutes.put(
  '/:projectId',
  validate(updateProjectSchema),
  projectController.updateProject
);

/**
 * @route   /api/projects/:projectId
 * @desc    Delete a project by ID
 * @access  Protected (requires authentication)
 */
projectRoutes.delete('/:projectId', projectController.deleteProject);

export default projectRoutes;
