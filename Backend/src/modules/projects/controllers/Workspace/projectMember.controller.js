import { sendResponse, sendErrorResponse } from '../../../../core/utils/response.js';
import { STATUS } from '../../../../core/constants/statusCodes.js';

export class ProjectMemberController {
    constructor(projectMemberService) {
        this.projectMemberService = projectMemberService;
        this.inviteMember = this.inviteMember.bind(this);
        this.verifyInvitation = this.verifyInvitation.bind(this);
        this.acceptInvitation = this.acceptInvitation.bind(this);
        this.rejectInvitation = this.rejectInvitation.bind(this);
    };

    /* Invite an member */
    async inviteMember(req, res, next) {
        try {
            const { id: userId } = req.user;
            const { projectId } = req.params;
            const { name, email } = req.body;

            const invitation = await this.projectMemberService.inviteMember(
                projectId,
                name,
                email,
                userId
            );

            if (!invitation.success) {
                return sendErrorResponse(res, invitation.statusCode, invitation.message, invitation.errors);
            }
            return sendResponse(
                res,
                STATUS.CREATED,
                invitation.message,
                invitation.data
            );
        } catch (error) {
            next(error);
        }
    }

    /* Verify a project invitation */
    async verifyInvitation(req, res, next) {
        try {
            const { token } = req.body;

            const result = await this.projectMemberService.verifyInvitation(token);
            if (!result.success) {
                return sendErrorResponse(res, result.statusCode, result.message, result.errors);
            }

            return sendResponse(res, STATUS.OK, result.message, result.data);
        } catch (error) {
            next(error);
        }
    }

    /* Accept a project invitation */
    async acceptInvitation(req, res, next) {
        try {
            const { token } = req.body;

            const result = await this.projectMemberService.acceptInvitation(
                token
            );

            if (!result.success) {
                return sendErrorResponse(res, result.statusCode, result.message, result.errors);
            }

            return sendResponse(res, STATUS.OK, result.message, result.data);
        } catch (error) {
            next(error);
        }
    }

    /* Reject a project invitation */
    async rejectInvitation(req, res, next) {
        try {
            const { token } = req.body;

            const result = await this.projectMemberService.rejectInvitation(
                token
            );

            if (!result.success) {
                return sendErrorResponse(res, result.statusCode, result.message, result.errors);
            }

            return sendResponse(res, STATUS.OK, result.message, result.data);
        } catch (error) {
            next(error);
        }
    }

    /* Get all members in a project */
    async getProjectMembers(req, res, next) {
        try {
            const { projectId } = req.params;
            const { page = 1, limit = 10, search = '' } = req.query;

            const result = await this.projectMemberService.getProjectMembers({
                projectId: parseInt(projectId),
                page: parseInt(page),
                limit: parseInt(limit),
                search
            });

            if (!result.success) {
                return sendErrorResponse(res, result.statusCode, result.message, result.errors);
            }

            return sendResponse(res, STATUS.OK, result.message, result.data);
        } catch (error) {
            next(error);
        }
    }

    /* Remove a member from a project */
    async removeMember(req, res, next) {
        try {
            const { projectId, memberId } = req.params;

            const result = await this.projectMemberService.removeMember(
                parseInt(projectId), 
                parseInt(memberId)
            );

            if (!result.success) {
                return sendErrorResponse(res, result.statusCode, result.message, result.errors);
            }

            return sendResponse(res, STATUS.OK, result.message, result.data);
        } catch (error) {
            next(error);
        }
    }
};