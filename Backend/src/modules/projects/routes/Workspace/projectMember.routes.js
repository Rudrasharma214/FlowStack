import express from 'express';
import { authenticate } from '../../../../core/modules/auth/middlewares/auth.middleware.js';
import { validate } from '../../../../core/middlewares/validate.middleware.js';
import { projectMemberInviteSchema } from '../../validations/Workspace/projectMember.schema.js';
import { ProjectMemberController } from '../../controllers/Workspace/projectMember.controller.js';
import { ProjectMemberService } from '../../services/Workspace/projectMember.service.js';

const projectMemberService = new ProjectMemberService();
const projectMemberController = new ProjectMemberController(projectMemberService);

const projectMemberRoutes = express.Router({ mergeParams: true });

/**
 * @route   POST /api/projects/:projectId/members
 * @desc    Send an invitation to a user to join the project as a member
 * @access  Protected (requires authentication)
 */
projectMemberRoutes.post(
    '/invite',
    authenticate,
    validate(projectMemberInviteSchema),
    projectMemberController.inviteMember
);

projectMemberRoutes.post(
    '/verify-invitation',
    projectMemberController.verifyInvitation
);

/**
 * @route   GET /api/projects/:projectId/accept-invitation
 * @desc    Accept a project invitation
 * @access  Protected (requires authentication)
 */
projectMemberRoutes.post(
    '/accept-invitation',
    projectMemberController.acceptInvitation
);

/**
 * @route   GET /api/projects/:projectId/reject-invitation
 * @desc    Reject a project invitation
 * @access  Protected (requires authentication)
 */
projectMemberRoutes.post(
    '/reject-invitation', 
    projectMemberController.rejectInvitation
);

/**
 * @route   GET /api/projects/:projectId/members
 * @desc    Get a list of all members in the project
 * @access  Protected (requires authentication)
 */
projectMemberRoutes.get(
    '/',
    authenticate,
    projectMemberController.getProjectMembers
);

/**
 * @route   DELETE /api/projects/:projectId/members/:memberId
 * @desc    Remove a member from the project
 * @access  Protected (requires authentication)
 */
projectMemberRoutes.delete(
    '/:memberId',
    authenticate,
    projectMemberController.removeMember
);

export default projectMemberRoutes;