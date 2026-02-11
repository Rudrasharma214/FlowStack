import ProjectMember from '../../models/Workspace/projectMember.model.js';

export class ProjectMemberRepository {
  /* Create Project Member */
  async createProjectMember(data, transaction = null) {
    return await ProjectMember.create(data, { transaction });
  }

  /* Get All Project Members by Project ID */
  async getProjectMembersByProjectId({
    whereClause,
    options = {},
    include = [],
    transaction = null,
  }) {
    const { count, rows } = await ProjectMember.findAndCountAll({
      where: whereClause,
      include,
      transaction,
      ...options,
    });
    return { count, rows };
  }

  /* Remove a Project Member */
  async removeProjectMember(projectId, userId, transaction = null) {
    return await ProjectMember.destroy({
      where: { projectId, userId },
      force: true,
      transaction,
    });
  }
}
