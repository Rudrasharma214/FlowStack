import ProjectInvitation from '../../models/Workspace/projectInvitation.model.js';

export class ProjectInvitationRepository {
  /* Create Project Invitation */
  async createProjectInvitation(data, transaction = null) {
    return await ProjectInvitation.create(data, { transaction });
  }

  /* Find Invitation by Email and Project ID */
  async findInvitationByEmailAndProjectId(
    email,
    projectId,
    transaction = null
  ) {
    return await ProjectInvitation.findOne({
      where: { email, project_id: projectId },
      transaction,
    });
  }

  /* Update Invitation Status */
  async updateInvitationStatus(
    invitationId,
    status,
    action_at,
    transaction = null
  ) {
    return await ProjectInvitation.update(
      { status, action_at },
      { where: { id: invitationId }, transaction }
    );
  }
}
