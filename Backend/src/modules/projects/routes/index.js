import express from 'express';
import projectRoutes from './Workspace/project.routes.js';
const projectsRouter = express.Router();

/**
 * @route   /api/projects
 * @desc    Main router for project management module
 * @access  Protected (requires authentication)
 */
projectsRouter.use('/', projectRoutes);

export default projectsRouter;